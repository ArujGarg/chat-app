import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

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

})

wss.on("close", (socket: WebSocket) => {
    allSockets = allSockets.filter((x) => x.socket != socket)
})




// message = {
//     type: 'join',
//      sender: 'me' || 'other',
//     payload: {
//         roomId: '123123'
//     }
// }


