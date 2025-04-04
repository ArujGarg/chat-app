import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Chat } from './pages/chat'
import { useState } from 'react'
import { RoomContext } from './context'

function App() {
  const [roomId, setRoomId] = useState("");

  return (
    <RoomContext.Provider value={{roomId, setRoomId}}>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </RoomContext.Provider>
    
  )
}

export default App
