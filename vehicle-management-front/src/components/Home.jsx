import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Importando o arquivo de estilos CSS
import Footbar from "../components/Footbar"; // Importando o Footbar

const Home = () => {
  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>Vehicle Management</h1>
        <p>Your one-stop solution for vehicle inventory management</p>
      </header>

      <div className="home-content">
        <div className="action-box">
          <h2>Manage Vehicles</h2>
          <p>View and manage all your vehicles in one place.</p>
          <Link to="/vehicles" className="btn-primary">View Vehicles</Link>
        </div>

        <div className="action-box">
          <h2>Add New Vehicle</h2>
          <p>Easily add and manage new vehicles to your inventory.</p>
          <Link to="/add-vehicle" className="btn-secondary">Add Vehicle</Link>
        </div>
      </div>
      
      
      <Footbar />
    </div>
  );
};

export default Home;
