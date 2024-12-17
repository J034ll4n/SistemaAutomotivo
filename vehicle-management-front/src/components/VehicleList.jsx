import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VehicleList.css";
import Lottie from "react-lottie";
import animationData from "../animations/Animation/Animation - 1734446685181.json";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [updatedVehicle, setUpdatedVehicle] = useState({
    year: "",
    color: "",
    price: "",
    mileage: "",
    status: "",
    brand: { name: "" },
    model: { id: "" }, // id do modelo
    imageUrl: "",
  });

  const [filters, setFilters] = useState({
    brand: "",
    modelId: "", // Agora estamos armazenando o ID do modelo
    minPrice: "",
    maxPrice: "",
    status: "",
  });

  const [isFiltering, setIsFiltering] = useState(false); // Variável de estado para controlar a animação

  useEffect(() => {
    // Carrega as marcas de veículos ao montar o componente
    axios.get("http://localhost:8080/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error loading brands:", error));

    // Carrega todos os veículos inicialmente
    axios.get("http://localhost:8080/vehicles/all")
      .then(response => {
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Quando a marca for selecionada, busca os modelos da marca
    if (filters.brand) {
      // Supondo que você tenha acesso ao ID da marca
      const selectedBrand = brands.find(brand => brand.name === filters.brand);
      if (selectedBrand) {
        axios.get("http://localhost:8080/models/search", {
          params: { brandId: selectedBrand.id }, // Passa o ID da marca
        })
          .then(response => {
            setModels(response.data); // Agora estamos armazenando os modelos como objetos
          })
          .catch(error => {
            console.error("Error loading models:", error);
            setModels([]); // Limpa os modelos em caso de erro
          });
      }
    } else {
      setModels([]); // Limpa os modelos se não houver marca selecionada
    }
  }, [filters.brand, brands]);

  const handleDelete = (vehicleId) => {
    axios.delete(`http://localhost:8080/vehicles/${vehicleId}`)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
        alert("Vehicle deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting vehicle:", error);
        alert("Error deleting vehicle. Please try again.");
      });
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setUpdatedVehicle({
      ...vehicle,
      brand: { name: vehicle.brand.name },
      model: { id: vehicle.model.id }, // Passando o ID do modelo
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { id } = selectedVehicle;

    axios.put(`http://localhost:8080/vehicles/${id}`, updatedVehicle)
      .then(() => {
        setVehicles(vehicles.map(vehicle =>
          vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
        ));
        setSelectedVehicle(null);
        alert("Vehicle updated successfully!");
      })
      .catch(error => {
        console.error("Error updating vehicle:", error);
        alert("Error updating vehicle. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setIsFiltering(true); // Ativa a animação

    const params = {};

    if (filters.brand) params.brand = filters.brand;
    if (filters.modelId) params.modelId = filters.modelId; // Passando o ID do modelo
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.status) params.status = filters.status;

    const filterApplied = Object.values(filters).some(val => val !== "");
    if (!filterApplied) {
      // Se nenhum filtro for aplicado, retornamos todos os veículos
      axios.get("http://localhost:8080/vehicles/all")
        .then(response => {
          setFilteredVehicles(response.data);
          setTimeout(() => setIsFiltering(false), 1000); // Desativa a animação após 1 segundo
        })
        .catch(error => {
          console.error("Error fetching all vehicles:", error);
          setIsFiltering(false); // Desativa a animação em caso de erro
        });
    } else {
      axios.get("http://localhost:8080/vehicles/search", { params })
        .then(response => {
          setFilteredVehicles(response.data);
          setTimeout(() => setIsFiltering(false), 1000); // Desativa a animação após 1 segundo
        })
        .catch(error => {
          console.error("Error filtering vehicles:", error);
          setIsFiltering(false); // Desativa a animação em caso de erro
        });
    }
  };

  return (
    <div className="vehicle-list-container">
      <h1>Vehicle Catalog</h1>

      <div className="filter-form">
        <label>Brand:</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        >
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand.name} value={brand.name}>{brand.name}</option>
          ))}
        </select>

        <label>Model:</label>
        <select
          name="modelId"
          value={filters.modelId}
          onChange={handleFilterChange}
          disabled={!filters.brand} // Desabilita se nenhuma marca estiver selecionada
        >
          <option value="">Select Model</option>
          {models.length > 0 ? (
            models.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))
          ) : (
            <option value="">No models available</option>
          )}
        </select>

        <label>Min Price:</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <label>Max Price:</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      {isFiltering && (
        <div className="loading-overlay">
          <div className="loading-animation">
            <Lottie
              options={{
                animationData: animationData,
                loop: true,
                autoplay: true,
              }}
              height={700}
              width={700}
            />
          </div>
        </div>
      )}

      {selectedVehicle ? (
        <div className="edit-form">
          <h2>Edit Vehicle</h2>
          <form onSubmit={handleUpdate}>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={updatedVehicle.year}
              onChange={handleChange}
            />
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={updatedVehicle.color}
              onChange={handleChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={updatedVehicle.price}
              onChange={handleChange}
            />
            <label>Mileage:</label>
            <input
              type="number"
              name="mileage"
              value={updatedVehicle.mileage}
              onChange={handleChange}
            />
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updatedVehicle.status}
              onChange={handleChange}
            />
            <label>Brand:</label>
            <input
              type="text"
              name="brand"
              value={updatedVehicle.brand.name}
              readOnly
            />
            <label>Model:</label>
            <input
              type="text"
              name="model"
              value={updatedVehicle.model.name}
              readOnly
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={updatedVehicle.imageUrl}
              onChange={handleChange}
            />
            <button type="submit">Update Vehicle</button>
            <button type="button" onClick={() => setSelectedVehicle(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="vehicle-list">
          {filteredVehicles.length === 0 ? (
            <p>No vehicles found for the selected filters.</p>
          ) : (
            filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="vehicle-card">
                <img
                  src={vehicle.imageUrl || "default-image-url.jpg"}
                  alt={`${vehicle.brand.name} ${vehicle.model.name}`}
                  className="vehicle-image"
                />
                <div className="vehicle-info">
                  <h3>{vehicle.brand.name} {vehicle.model.name}</h3>
                  <p><strong>Year:</strong> {vehicle.year}</p>
                  <p><strong>Color:</strong> {vehicle.color}</p>
                  <p><strong>Price:</strong> ${vehicle.price}</p>
                  <p><strong>Status:</strong> {vehicle.status}</p>
                  <button onClick={() => handleEdit(vehicle)}>Edit</button>
                  <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
