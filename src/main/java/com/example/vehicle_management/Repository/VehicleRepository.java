package com.example.vehicle_management.Repository;

import com.example.vehicle_management.Model.Vehicle;
import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Model.VehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
    
    
    List<Vehicle> findByBrandAndModelAndPrice(Brand brand, VehicleModel model, Double price);

    List<Vehicle> findByStatus(String status);

    List<Vehicle> findByBrand(Brand brand);

    List<Vehicle> findByModel(VehicleModel model);

    List<Vehicle> findByPriceBetween(Double minPrice, Double maxPrice);
}
