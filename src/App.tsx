import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/LoginPage/SignUpPage";
import ChatPage from "./components/ChatPage/ChatPage";
import ChatroomPage from "./components/ChatPage/ChatroomPage";
import Menubar from "./components/Menubar";

function App() {
  return (
    <BrowserRouter>
      <Menubar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatroom" element={<ChatroomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
