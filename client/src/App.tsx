import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Chat } from './pages/chat'
import { useState } from 'react'
import { RoomContext, NameContext } from './context'

function App() {
  const [roomId, setRoomId] = useState("everyone");
  const [username, setUsername] = useState("Anonymous");

  return (
    <RoomContext.Provider value={{roomId, setRoomId}}>
    <NameContext.Provider value={{username, setUsername}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </BrowserRouter>
    </NameContext.Provider>
    </RoomContext.Provider>
    
  )
}

export default App
