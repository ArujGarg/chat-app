import { createContext, useContext } from "react";

export const RoomContext = createContext<{
    roomId: string,
    setRoomId: (id: string) => void
} | null >(null)

export const NameContext = createContext<{
    username: string,
    setUsername: (name: string) => void
} | null >(null)




export const useRoom = () => {
    const context = useContext(RoomContext)
    if(context === null) throw new Error("useRoom must be used within a context providor");
    return context;
}

export const useUsername = () => {
    const usernameContext = useContext(NameContext);
    if(usernameContext === null) throw new Error("useUsername must be used within a context providor");
    return usernameContext;
}