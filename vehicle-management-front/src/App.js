// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importando os componentes
import Home from "./components/Home";
import VehicleList from "./components/VehicleList";
import AddVehicle from "./components/AddVehicle";
import UpdateVehicle from "./components/UpdateVehicle";
import DeleteVehicle from "./components/DeleteVehicle";
import Navbar from "./components/Navbar";  
import Contact from "./components/Contact";  

const App = () => {
  return (
    <Router>
      <Navbar />  

      {/* Definindo as rotas para as páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/update-vehicle/:id" element={<UpdateVehicle />} />
        <Route path="/delete-vehicle/:id" element={<DeleteVehicle />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>
  );
};

export default App;
