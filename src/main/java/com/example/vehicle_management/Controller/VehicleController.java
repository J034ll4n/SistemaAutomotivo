package com.example.vehicle_management.Controller;

import com.example.vehicle_management.Model.Vehicle;
import com.example.vehicle_management.Model.VehicleModel;
import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Service.VehicleService;
import com.example.vehicle_management.Service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;
    private final BrandService brandService;

    public VehicleController(VehicleService vehicleService, BrandService brandService) {
        this.vehicleService = vehicleService;
        this.brandService = brandService;
    }

    @GetMapping("/brands")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @PostMapping("/add")
    public String addVehicle(@RequestBody Vehicle vehicle) {
    try {
        // Verificar e buscar a marca pelo nome
        Brand brand = brandService.getBrandByName(vehicle.getBrand().getName());
        if (brand == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca não encontrada");
        }

        // Verificar e buscar o modelo pelo ID
        VehicleModel model = vehicleService.getModelById(vehicle.getModel().getId());
        if (model == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Modelo não encontrado");
        }

        // Associar marca e modelo ao veículo
        vehicle.setBrand(brand);
        vehicle.setModel(model);

        // Salvar veículo
        vehicleService.saveVehicle(vehicle);
        return "Veículo adicionado com sucesso!";
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao adicionar veículo: " + e.getMessage());
    }}


    @GetMapping("/all")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/search")
    public List<Vehicle> searchVehicles(@RequestParam(required = false) String brand, 
                                         @RequestParam(required = false) Long modelId, 
                                         @RequestParam(required = false) Double minPrice, 
                                         @RequestParam(required = false) Double maxPrice, 
                                         @RequestParam(required = false) String status) {
        if (brand == null && modelId == null && minPrice == null && maxPrice == null && status == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pelo menos um parâmetro de pesquisa deve ser fornecido");
        }
        return vehicleService.searchVehicles(brand, modelId, minPrice, maxPrice, status);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        if (vehicleService.getVehicleById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Veículo não encontrado");
        }
        vehicleService.deleteVehicle(id);
        return "Veículo removido com sucesso!";
    }
    @PutMapping("/{id}")
public String updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails) {
    try {
        // Verificar se o veículo existe
        Vehicle vehicle = vehicleService.getVehicleById(id);
        if (vehicle == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Veículo não encontrado");
        }

        // Atualizar os dados do veículo
        vehicle.setYear(vehicleDetails.getYear());
        vehicle.setColor(vehicleDetails.getColor());
        vehicle.setPrice(vehicleDetails.getPrice());
        vehicle.setMileage(vehicleDetails.getMileage());
        vehicle.setStatus(vehicleDetails.getStatus());

        // Verificar e atualizar a marca e o modelo
        Brand brand = brandService.getBrandByName(vehicleDetails.getBrand().getName());
        if (brand == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca não encontrada");
        }

        VehicleModel model = vehicleService.getModelById(vehicleDetails.getModel().getId());
        if (model == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Modelo não encontrado");
        }

        vehicle.setBrand(brand);
        vehicle.setModel(model);

        // Salvar o veículo atualizado
        vehicleService.saveVehicle(vehicle);

        return "Veículo atualizado com sucesso!";
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar veículo: " + e.getMessage());
    }
}

}
