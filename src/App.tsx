import React from "react";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
    </div>
  );
};

export default App;
