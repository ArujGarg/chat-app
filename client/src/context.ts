import { createContext, useContext } from "react";

export const RoomContext = createContext<{
    roomId: string,
    setRoomId: (id: string) => void
} | null >(null)


export const useRoom = () => {
    const context = useContext(RoomContext)
    if(context === null) throw new Error("useRoom must be used within a context providor");
    return context;

}