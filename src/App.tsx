import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FormAddEdit from "./components/FormAddEdit";
import Login from "./pages/Login";
import Authenticated from "./pages/Authenticated";


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/authenticated" element={<Authenticated />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add" element={<FormAddEdit />}></Route>
        <Route path="/update/:id" element={<FormAddEdit />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

