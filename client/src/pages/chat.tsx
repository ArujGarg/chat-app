import { Chance } from 'chance'
import { useEffect, useRef, useState } from "react";
import { useRoom } from "../context";
import { Link } from "react-router-dom";

let chance = new Chance();
interface Message {
    type: string,
    payload: {
        userId: string,
        message: string
    }
}

const userId = chance.string();

export const Chat = () => {
    const [userCount, setUserCount] = useState(0);
    const [messages, setMessages] = useState<Message[]>([]);
    const wsRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { roomId } = useRoom(); 

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onmessage = (event) => {
            console.log(event.data)
            try {
                const parsedMessage = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, parsedMessage])
            } catch (error) {
                console.error("error parsing message to JSON", error);
            }
        }

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomId
                }
            }))
            setUserCount(userCount + 1);
        }

        ws.onclose = () => {
            console.log('disconnected');
            setUserCount(userCount - 1);
        }
        wsRef.current = ws;
    }, [])



    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-400 space-y-4">
            {/* Chat Card */}
            <div className="max-w-md w-full p-4 border rounded-xl shadow-lg bg-white flex flex-col h-[600px]">
                {/* Header */}
                <div className="text-xl font-bold text-center border-b mb-2">
                <div>Chat Room</div>
                <div className="flex justify-between text-sm text-gray-500 font-normal">
                    <div>Joined: {userCount}</div>
                    <div>UserId: {userId}</div>
                    <div>Room ID: {roomId}</div>
                </div>
                </div>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100 rounded-md">
                {messages.map((m, i) => (
                    <div key={i} 
                    className={`flex ${m.payload.userId === userId ? "justify-end" : "justify-start"} `}>
                        <div className={`p-2 rounded-lg max-w-xs 
                            ${m.payload.userId === userId ? 
                            "bg-blue-500 text-white" : "bg-gray-300 text-gray"}`}>
                                {m.payload.message}
                        </div>
                    </div>
                ))}
                </div>

                {/* Input Box & Send Button */}
                <div className="flex items-center border-t p-2 mt-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-md mr-2"
                />
                <button
                    onClick={() => {
                    const message = inputRef.current != null ? inputRef.current.value : '';
                    if (message.trim() === '') return;

                    if (wsRef.current) {
                        wsRef.current.send(
                            JSON.stringify({
                                type: 'chat',
                                payload: {
                                    userId: userId,
                                    message: message,
                                }
                            })
                        );
                    }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Send
                </button>
                </div>
            </div>

            {/* Disconnect Button (Outside Card) */}
            <Link to={'/home'}>
                <button
                    onClick={() => {
                    if (wsRef.current) {
                        wsRef.current.close();
                        wsRef.current = null;
                        console.log('Disconnected from chat');
                    }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Disconnect
                </button>
            </Link>
        </div>
    )
}