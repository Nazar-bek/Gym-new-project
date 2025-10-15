import React from "react";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
      <Toaster position="top-center"/>
    </div>
  );
};

export default App;
