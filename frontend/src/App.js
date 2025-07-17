

import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Enterance from "./html/enterance";
import Register from "./html/register";
import Login from "./html/login";
import Main from "./html/main";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Enterance/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/login/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;