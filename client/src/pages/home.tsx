import { Link } from "react-router-dom"
import { Chance } from 'chance'
import { useRef } from "react";
import { useRoom } from "../context";

let chance = new Chance()
export const Home = () => {
    let roomIdRef = useRef<HTMLInputElement>(null)
    const { roomId, setRoomId } = useRoom();
    return (
        <div className="h-screen flex items-center justify-center bg-gray-400">
            <div className="max-w-md w-full mx-auto p-4  rounded-xl shadow-xl bg-white flex flex-col h-[400px] justify-center">
                {/* Room ID Input */}
                <input 
                    ref={roomIdRef}
                    type="text" 
                    placeholder="Enter room ID..." 
                    className="p-2 border rounded-md w-full mb-2"
                />
                
                {/* Join Room Button */}
                <Link to={'/chat'} onClick={() => {
                    if(roomIdRef.current){
                        setRoomId(roomIdRef.current.value)
                        console.log(roomIdRef.current?.value)
                    }
                }} >
                    <button 
                        className="px-4 py-2 bg-gray-500 text-white rounded-md w-full mb-2 cursor-pointer"
                    >
                        Join a Room
                    </button>
                </Link>
                
                {/* Divider */}
                <hr className="my-2" />
                
                {/* Create Room Button */}
                <Link to={'/chat'} onClick={() => {
                    const newRoomId = chance.string({length: 6})
                    console.log(newRoomId)
                    setRoomId(newRoomId)
                    console.log(roomId)
                }} >
                    <button
                        className="px-4 py-2 bg-neutral-800 text-white rounded-md w-full cursor-pointer"
                    >
                        Create a Room
                    </button> 
                </Link>
            </div>
        </div>
    )
}

