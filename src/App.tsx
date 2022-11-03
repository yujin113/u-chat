import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/LoginPage/SignUpPage";
import ChatPage from "./components/ChatPage/ChatPage";
import ChatroomPage from "./components/ChatPage/ChatroomPage";
import Menubar from "./components/Menubar";
import AddRoomPage from "./components/ChatPage/AddRoomPage";
import EnterRoomModal from "./components/ChatPage/EnterRoomModal";
import AboutPage from "./components/AboutPage";

export const UrlContext = createContext("");

function App() {
  return (
    <UrlContext.Provider value={"http://localhost:8080"}>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />
          <Route path="/chatroom" element={<ChatroomPage />} />
          <Route path="/addroom" element={<AddRoomPage />} />
          <Route path="/enterRoom" element={<EnterRoomModal />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </UrlContext.Provider>
  );
}

export default App;
