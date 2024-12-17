import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/vehicles/${id}`)
      .then(() => {
        alert("Vehicle deleted successfully!");
        navigate("/vehicles");
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Delete Vehicle</h1>
      <p>Are you sure you want to delete this vehicle?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/vehicles")}>Cancel</button>
    </div>
  );
};

export default DeleteVehicle;
