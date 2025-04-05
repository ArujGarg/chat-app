import { WebSocketServer, WebSocket } from "ws";
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080
const wss = new WebSocketServer({port});

interface User {
    socket: WebSocket
    room: string
}


let allSockets: User[] =  []

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string); //to fix ts issues
        if(parsedMessage.type === 'join'){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })

            const roomUsers = allSockets.filter((x) => x.room === parsedMessage.payload.roomId);
            roomUsers.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "user_count",
                    payload: {
                        userCount: roomUsers.length
                    }
                }))
            })
        }

        if(parsedMessage.type === 'chat'){
            let currentUserRoom = allSockets.find((x) => x.socket == socket)?.room
            const usersWithSameRoom = allSockets.filter((x) => x.room == currentUserRoom);
            usersWithSameRoom.forEach((x) => {
                let s = x.socket;
                s.send(JSON.stringify({
                    type: 'chat',
                    payload: {
                        userId: parsedMessage.payload.userId,
                        message: parsedMessage.payload.message,
                        username: parsedMessage.payload.username,
                        time: new Date().toLocaleTimeString('en-GB', { 
                                    hour: "2-digit", 
                                    minute: "2-digit"
                                })
                    }
                }));
            })
        }
    })

    socket.on("close", () => {
        const userWhoLeft = allSockets.find((x) => x.socket === socket);
        if(userWhoLeft){
            const room = userWhoLeft.room
            allSockets = allSockets.filter((x) => x.socket !== socket)

            const usersWithSameRoom = allSockets.filter((x) => x.room === room);
            usersWithSameRoom.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "user_count",
                    payload: {
                        userCount: usersWithSameRoom.length
                    }
                }))
            })
        }
    })

})




// message = {
//     type: 'join',
//      sender: 'me' || 'other',
//     payload: {
//         roomId: '123123'
//     }
// }


