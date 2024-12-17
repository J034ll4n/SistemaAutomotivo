import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Importando o arquivo de estilos CSS
import logo from '../img/Logo.png'; // Importando a imagem do logo corretamente

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo da marca */}
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Vehicle Management</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/add-vehicle">Add Vehicle</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
