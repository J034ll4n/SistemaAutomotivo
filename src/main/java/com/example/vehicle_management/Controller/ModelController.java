package com.example.vehicle_management.Controller;

import com.example.vehicle_management.Model.VehicleModel;
import com.example.vehicle_management.Service.VehicleModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/models")
public class ModelController {

    @Autowired
    private VehicleModelService modelService;

    @GetMapping("/all")
    public List<VehicleModel> getAllModels() {
        return modelService.getAllModels();
    }

    @GetMapping("/search")
    public List<VehicleModel> searchModelsByBrand(@RequestParam Long brandId) {
        return modelService.getModelsByBrandId(brandId);
    }

    @PostMapping("/add")
    public String addModel(@RequestBody VehicleModel vehicleModel) {
        modelService.saveModel(vehicleModel);
        return "Modelo adicionado com sucesso!";
    }
}
