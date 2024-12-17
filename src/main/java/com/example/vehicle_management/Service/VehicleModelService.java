package com.example.vehicle_management.Service;

import com.example.vehicle_management.Model.VehicleModel;
import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Repository.VehicleModelRepository;
import com.example.vehicle_management.Repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleModelService {

    @Autowired
    private VehicleModelRepository vehicleModelRepository;

    @Autowired
    private BrandRepository brandRepository;

    // Método para salvar um modelo de veículo
    public VehicleModel saveModel(VehicleModel model) {
        return vehicleModelRepository.save(model);
    }

    // Método para buscar modelos por marca (brandId)
    public List<VehicleModel> getModelsByBrandId(Long brandId) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new IllegalArgumentException("Marca não encontrada"));
        return vehicleModelRepository.findByBrand(brand);
    }

    // Método para obter todos os modelos de veículos
    public List<VehicleModel> getAllModels() {
        return vehicleModelRepository.findAll();
    }
}
