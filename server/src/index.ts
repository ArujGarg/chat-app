import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket
    room: string
}

let allSockets: User[] =  []

wss.on("connection", (socket) => {
    console.log("user conected");
    socket.on("message", (message) => {
        
        const parsedMessage = JSON.parse(message as unknown as string); //to fix ts issues
        if(parsedMessage.type === 'join'){
            console.log("inside join")
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === 'chat'){
            console.log("inside chat");
            let currentUserRoom = allSockets.find((x) => x.socket == socket)?.room
            const usersWithSameRoom = allSockets.filter((x) => x.room == currentUserRoom);
            usersWithSameRoom.forEach((x) => {
                let s = x.socket;
                s.send(parsedMessage.payload.message);
            })
        }
    })
})

// message = {
//     type: 'join',
//     payload: {
//         roomId: '123123'
//     }
// }


