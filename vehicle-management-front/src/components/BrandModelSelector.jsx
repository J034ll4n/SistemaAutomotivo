// src/components/BrandModelSelector.js
import React, { useState, useEffect } from 'react';

function BrandModelSelector() {
  const [brands, setBrands] = useState([]); // Marcas
  const [models, setModels] = useState([]); // Modelos
  const [filteredModels, setFilteredModels] = useState([]); // Modelos filtrados por marca
  const [selectedBrand, setSelectedBrand] = useState(''); // Marca selecionada

  // Carregar as marcas e modelos (todos os modelos no início)
  useEffect(() => {
    fetch('http://localhost:8080/brands')
      .then((response) => response.json())
      .then((data) => setBrands(data));

    fetch('http://localhost:8080/models/all')
      .then((response) => response.json())
      .then((data) => {
        setModels(data);
        setFilteredModels(data); // Inicializa com todos os modelos
      });
  }, []);

  // Função chamada quando a marca for alterada
  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);

    // Filtrar os modelos com base na marca selecionada
    if (brandId) {
      const filtered = models.filter(model => model.brandId === brandId);
      setFilteredModels(filtered);
    } else {
      setFilteredModels(models); // Caso nenhuma marca seja selecionada, exibe todos os modelos
    }
  };

  return (
    <div>
      <h1>Select a Brand</h1>
      <select onChange={handleBrandChange} value={selectedBrand}>
        <option value="">Select a brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <h2>Select a Model</h2>
      <select>
        {filteredModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BrandModelSelector;
