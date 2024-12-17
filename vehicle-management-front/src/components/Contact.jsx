import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Contact.css";
import avatar from "../img/avatar.png";

const Contact = () => {
  useEffect(() => {
    
    if (document.getElementById("map") && !document.getElementById("map")._leaflet_id) {
      // Criando o mapa e configurando as opções
      const map = L.map("map").setView([51.505, -0.09], 13);

     
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

     
      L.marker([51.505, -0.09]).addTo(map)
        .bindPopup("<b>Vehicle Management</b><br/>Localização fictícia")
        .openPopup();
    }
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="avatar-container">
          <img src={avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <p>If you have any questions, feel free to reach out to us!</p>

          <form className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div id="map" style={{ height: "400px", width: "100%", marginTop: "30px" }}></div>

      <footer>
        <p>© 2024 Vehicle Management. All rights reserved.</p>
        <p>Contact us: <a href="mailto:contact@vehiclemanagement.com">contact@vehiclemanagement.com</a></p>
      </footer>
    </div>
  );
};

export default Contact;
