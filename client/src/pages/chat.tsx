import { useEffect, useRef, useState } from "react";

export const Chat = () => {

    const [messages, setMessages] = useState(["hi there", "hello"]);
    const wsRef = useRef<WebSocket>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onmessage = (event) => {
        setMessages(m => [...m, event.data])
        }

        ws.onopen = () => {
        ws.send(JSON.stringify({
            type: "join",
            payload: {
            roomId: "red"
            }
        }))
        }
        wsRef.current = ws;
    }, [])



    return (
        <div className="h-screen flex items-center justify-center bg-gray-400">
        <div className="max-w-md w-full mx-auto p-4 border rounded-xl shadow-lg bg-white flex flex-col h-[600px]">
            {/* Header */}
            <div className="text-xl font-bold text-center py-2 border-b">Chat Room</div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100">
            {messages.map(m => <div className='bg-gray-300 p-2 rounded-lg  w-max'>{m}</div>)}
            </div>

            {/* Input Box & Send Button */}
            <div className="flex items-center border-t p-2">
            <input 
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md mr-2"
            />
            <button onClick={(() => {
                const message = inputRef.current != null ? inputRef.current.value : "" ;
                console.log(message)
                wsRef.current.send(JSON.stringify({
                    type: "chat",
                    payload: {
                    message: message
                    }
                }))
                })} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                Send
            </button>
            </div>
        </div>
        </div>
    )
}