package com.example.vehicle_management.Controller;

import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Service.BrandService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BrandController {

    private final BrandService brandService;


    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    
    @GetMapping("/brands")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();  
    }
}
