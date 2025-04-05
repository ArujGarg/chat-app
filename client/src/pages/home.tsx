import { Link } from "react-router-dom"
import { Chance } from 'chance'
import { useRef } from "react";
import { useRoom, useUsername } from "../context";
import { Avatar } from "@mui/material";

let chance = new Chance()
export const Home = () => {
    let roomIdRef = useRef<HTMLInputElement>(null);
    let usernameRef = useRef<HTMLInputElement>(null)
    const { roomId, setRoomId } = useRoom();
    const { setUsername } = useUsername();
    return (
        <div className="h-screen flex items-center justify-center bg-gray-400">
            <div className="max-w-md w-full mx-auto p-4  rounded-xl shadow-xl bg-white flex flex-col h-[400px] justify-center">
                <div className="mb-8">
                    <div className="flex justify-center text-xl mb-2">Choose an avatar</div>
                    <div className="flex justify-center gap-x-4">
                        <Avatar className="cursor-pointer" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar className="cursor-pointer" alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                        <Avatar className="cursor-pointer" alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar className="cursor-pointer" alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar className="cursor-pointer" alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </div>
                </div>
                {/* Username and avatar */}
                <input ref={usernameRef} 
                    type="text" 
                    placeholder="Enter a username"
                    className="p-2 border rounded-md w-full mb-2" 
                />
                {/* Room ID Input */}
                <input 
                    ref={roomIdRef}
                    type="text" 
                    placeholder="Enter room ID, 'everyone' by default" 
                    className="p-2 border rounded-md w-full mb-2"
                />
                
                {/* Join Room Button */}
                <Link to={'/chat'} onClick={() => {
                    if(roomIdRef.current && usernameRef.current){
                        setRoomId(roomIdRef.current.value)
                        setUsername(usernameRef.current.value)
                        console.log(roomIdRef.current?.value)
                        console.log(usernameRef.current?.value)
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
                    if(usernameRef.current){
                        setUsername(usernameRef.current.value)
                    }
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

function Lion() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="lion">
        <path fill="#bd7f00" d="M57,35.39a13,13,0,0,1-6.64,11.33L32,57,13.64,46.72A13,13,0,0,1,8.66,29L13.19,21l2.44-4.35a18.75,18.75,0,0,1,25.86-7,18.36,18.36,0,0,1,2.16,1.48,18.72,18.72,0,0,1,4.72,5.54L50.81,21,55.34,29A13,13,0,0,1,57,35.39Z"></path>
        <path fill="#efc589" d="M57 14a7 7 0 0 1-6.19 7L48.37 16.6a18.72 18.72 0 0 0-4.72-5.54A7 7 0 0 1 57 14zM20.35 11.06a18.72 18.72 0 0 0-4.72 5.54L13.19 21a7 7 0 1 1 7.16-9.89zM44.57 34.14h0L38.74 45A7.66 7.66 0 0 1 32 49h0a7.66 7.66 0 0 1-6.74-4L19.43 34.14h0a4.12 4.12 0 0 1-3.91-5.42l2.61-7.82a4 4 0 0 1 5.16-2.5L32 21.57l8.71-3.17a4 4 0 0 1 5.16 2.5l2.61 7.82A4.12 4.12 0 0 1 44.57 34.14z"></path>
        <circle cx="25.5" cy="26.5" r="1.5" fill="#2d2d2d"></circle>
        <circle cx="38.5" cy="26.5" r="1.5" fill="#2d2d2d"></circle>
        <path fill="#3e2c27" d="M32,42a1,1,0,0,1-1-1V36a1,1,0,0,1,2,0v5A1,1,0,0,1,32,42Z"></path>
        <path fill="#3e2c27" d="M29,44a1,1,0,0,1-.55-1.83l3-2a1,1,0,0,1,1.1,1.66l-3,2A.94.94,0,0,1,29,44Z"></path>
        <path fill="#3e2c27" d="M35 44a.94.94 0 0 1-.55-.17l-3-2a1 1 0 0 1 1.1-1.66l3 2A1 1 0 0 1 35 44zM32 37.38h0l-2.23-1.12A1.4 1.4 0 0 1 29 35h0a1.39 1.39 0 0 1 1.39-1.39h3.22A1.39 1.39 0 0 1 35 35h0a1.4 1.4 0 0 1-.77 1.24z"></path>
        </svg>
    </div>
}