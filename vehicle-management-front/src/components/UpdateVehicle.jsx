import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({
    brand: { name: "" },
    model: { id: "" },
    year: "",
    color: "",
    price: "",
    mileage: "",
    status: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/vehicles/${id}`)
      .then(response => setVehicle(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("brand") || name.includes("model")) {
      const [key, subkey] = name.split(".");
      setVehicle({ ...vehicle, [key]: { ...vehicle[key], [subkey]: value } });
    } else {
      setVehicle({ ...vehicle, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/vehicles/${id}`, vehicle)
      .then(() => alert("Vehicle updated successfully!"))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Vehicle</h1>
      <input type="text" name="brand.name" value={vehicle.brand.name} onChange={handleChange} />
      <input type="number" name="model.id" value={vehicle.model.id} onChange={handleChange} />
      <input type="number" name="year" value={vehicle.year} onChange={handleChange} />
      <input type="text" name="color" value={vehicle.color} onChange={handleChange} />
      <input type="number" name="price" value={vehicle.price} onChange={handleChange} />
      <input type="number" name="mileage" value={vehicle.mileage} onChange={handleChange} />
      <input type="text" name="status" value={vehicle.status} onChange={handleChange} />
      <button type="submit">Update Vehicle</button>
    </form>
  );
};

export default UpdateVehicle;
