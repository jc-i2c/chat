import React from "react";
import { Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat/Chat";
import Login from "./pages/Chat/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
