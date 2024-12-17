package com.example.vehicle_management.Service;

import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Brand getBrandByName(String name) {
        Brand brand = brandRepository.findByName(name); // Obtém a marca pelo nome
        if (brand == null) { // Verifica se a marca não foi encontrada
            throw new IllegalArgumentException("Marca não encontrada");
        }
        return brand; // Retorna a marca encontrada
    }
    
}
