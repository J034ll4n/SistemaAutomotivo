package com.example.vehicle_management.Repository;

import com.example.vehicle_management.Model.VehicleModel;
import com.example.vehicle_management.Model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleModelRepository extends JpaRepository<VehicleModel, Long> {
    List<VehicleModel> findByBrand(Brand brand);
    VehicleModel findByName(String name); 
}
