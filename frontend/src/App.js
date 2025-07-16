import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Enterance from "./html/enterance";
import Register from "./html/register";
import Login from "./html/login";
import Main from "./html/main";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Enterance/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;