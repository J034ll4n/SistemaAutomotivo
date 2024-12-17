import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddVehicle.css'; // Importando o arquivo de estilos CSS

const AddVehicle = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [formData, setFormData] = useState({
    brand: { id: "", name: "" },
    model: { id: "" },
    year: "",
    color: "",
    price: "",
    mileage: "",
    status: "",
    imageUrl: "",
  });

  // Fetch brands on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/brands")
      .then((response) => {
        setBrands(response.data);
        setLoadingBrands(false);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setLoadingBrands(false);
      });
  }, []);

  const handleBrandChange = (e) => {
    const selectedBrand = brands.find((brand) => brand.id === parseInt(e.target.value, 10));
    setFormData((prev) => ({
      ...prev,
      brand: { id: selectedBrand?.id || "", name: selectedBrand?.name || "" },
      model: { id: "" }, // Reset model when brand changes
    }));

    if (selectedBrand) {
      setLoadingModels(true);
      axios
        .get(`http://localhost:8080/models/all`)
        .then((response) => {
          setModels(response.data.filter((model) => model.brand.id === selectedBrand.id));
          setLoadingModels(false);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
          setModels([]);
          setLoadingModels(false);
        });
    } else {
      setModels([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModelChange = (e) => {
    const selectedModelId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      model: { id: selectedModelId },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifique se todos os campos necessários estão preenchidos
    if (!formData.brand.id || !formData.model.id || !formData.year || !formData.color || !formData.price || !formData.mileage || !formData.status || !formData.imageUrl) {
      alert("Please fill out all fields.");
      return;
    }

    const vehicleData = {
      brand: { name: formData.brand.name },
      model: { id: parseInt(formData.model.id, 10) },
      year: parseInt(formData.year, 10),
      color: formData.color,
      price: parseFloat(formData.price),
      mileage: parseFloat(formData.mileage),
      status: formData.status,
      imageUrl: formData.imageUrl,
    };

    console.log("Submitting vehicle data:", vehicleData); // Verifique os dados no console

    // Envia os dados como JSON
    axios
      .post("http://localhost:8080/vehicles/add", vehicleData, {
        headers: {
          'Content-Type': 'application/json', // Garante que o backend receba como JSON
        },
      })
      .then(() => {
        alert("Vehicle added successfully!");
        setFormData({
          brand: { id: "", name: "" },
          model: { id: "" },
          year: "",
          color: "",
          price: "",
          mileage: "",
          status: "",
          imageUrl: "",
        });
        setModels([]);
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
        alert("Error adding vehicle. Please try again.");
      });
  };

  return (
    <div className="add-vehicle-container">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select
            name="brand.id"
            id="brand"
            onChange={handleBrandChange}
            value={formData.brand.id}
            required
          >
            <option value="">Select a Brand</option>
            {loadingBrands ? (
              <option value="">Loading brands...</option>
            ) : (
              brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <select
            name="model.id"
            id="model"
            onChange={handleModelChange}
            value={formData.model.id}
            disabled={!formData.brand.id || loadingModels}
            required
          >
            <option value="">Select a Model</option>
            {loadingModels ? (
              <option value="">Loading models...</option>
            ) : (
              models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            id="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mileage">Mileage</label>
          <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Reserved">Reserved</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
