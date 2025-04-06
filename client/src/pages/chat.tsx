import { Chance } from 'chance'
import { useEffect, useRef, useState } from "react";
import { useRoom, useUsername } from "../context";
import { Link } from "react-router-dom";

let chance = new Chance();
interface Message {
    type: string,
    payload: {
        userId: string,
        message: string,
        username: string,
        time: string
    }
}

const userId = chance.string({length: 6});

export const Chat = () => {
    const [userCount, setUserCount] = useState(0);
    const [messages, setMessages] = useState<Message[]>([]);
    const wsRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { roomId } = useRoom(); 
    const { username } = useUsername();
    const divRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const ws = new WebSocket("wss://chat-app-sl5k.onrender.com");
        ws.onmessage = (event) => {
            console.log(event.data)
            try {
                const parsedMessage = JSON.parse(event.data);
                if(parsedMessage.type === "user_count"){
                    setUserCount(parsedMessage.payload.userCount);
                }
                else {
                    setMessages((prevMessages) => [...prevMessages, parsedMessage])
                }
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
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

        if(inputRef.current){
            inputRef.current?.focus();
        }
        wsRef.current = ws;
    }, [])

    useEffect(() => {
        if(divRef.current){
            divRef.current.scrollTop = divRef.current.scrollHeight
        }
    }, [messages])


    function sendMesssage(){
        const message = inputRef.current != null ? inputRef.current.value : '';
        if (message.trim() === '') return;

        if (wsRef.current) {
            wsRef.current.send(
                JSON.stringify({
                    type: 'chat',
                    payload: {
                        userId: userId,
                        message: message,
                        username: username,
                        time: new Date().toLocaleTimeString('en-BG', { 
                                            hour: "2-digit", 
                                            minute: "2-digit",
                                            timeZone: 'Asia/Kolkata'
                                        })
                    }
                })
            );
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.key === 'Enter'){
            sendMesssage();
            if(inputRef.current){
                inputRef.current.value = ""
            }
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-400 space-y-4">
            {/* Chat Card */}
            <div className="max-w-md w-full p-4 border rounded-xl shadow-lg bg-white flex flex-col h-[600px]">
                {/* Header */}
                <div className="text-xl font-bold text-center border-b mb-2">
                <div>Chat Room</div>
                <div className="flex justify-between text-sm text-gray-500 font-normal">
                    <div>Joined: {userCount}</div>
                    {/* can display userId here */}
                    <div>Room ID: {roomId}</div>
                </div>
                </div>

                {/* Message Area */}
                <div ref={divRef} className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100 rounded-md">
                {messages.map((m, i) => (
                    <div key={i} 
                    className={`flex ${m.payload.userId === userId ? "justify-end" : "justify-start"} `}>
                        <div className={`p-2 rounded-lg max-w-xs min-w-20
                            ${m.payload.userId === userId ? 
                            "bg-blue-500 text-white" : "bg-gray-300"}`}>
                                <div className="text-xs font-bold">
                                    {m.payload.username}
                                </div>
                                <div className="text-sm">
                                    {m.payload.message}
                                </div>
                                <div className='text-xs text-right'>
                                    {m.payload.time}
                                </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* Input Box & Send Button */}
                <div className="flex items-center border-t p-2 mt-2">
                <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-md mr-2"
                />
                <button
                    onClick={sendMesssage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Send
                </button>
                </div>
            </div>

            {/* Disconnect Button (Outside Card) */}
            <Link to={'/'}>
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