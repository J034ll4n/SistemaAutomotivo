package com.example.vehicle_management.Service;

import com.example.vehicle_management.Model.Vehicle;
import com.example.vehicle_management.Model.Brand;
import com.example.vehicle_management.Model.VehicleModel;
import com.example.vehicle_management.Model.VehicleSpecifications;
import com.example.vehicle_management.Repository.VehicleRepository;
import com.example.vehicle_management.Repository.BrandRepository;
import com.example.vehicle_management.Repository.VehicleModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private VehicleModelRepository vehicleModelRepository;

    /**
     * Salva um veículo no banco de dados.
     *
     * @param vehicle Objeto veículo a ser salvo.
     * @return O veículo salvo.
     * @throws IllegalArgumentException Se a marca ou modelo não forem encontrados.
     */
    public Vehicle saveVehicle(Vehicle vehicle) {
        // Validar a marca
        Brand brand = brandRepository.findByName(vehicle.getBrand().getName());
        if (brand == null) {
            throw new IllegalArgumentException("Marca não encontrada: " + vehicle.getBrand().getName());
        }

        // Validar o modelo
        VehicleModel model = vehicleModelRepository.findById(vehicle.getModel().getId())
                .orElseThrow(() -> new IllegalArgumentException("Modelo não encontrado com ID: " + vehicle.getModel().getId()));

        // Associar marca e modelo ao veículo
        vehicle.setBrand(brand);
        vehicle.setModel(model);

        return vehicleRepository.save(vehicle);
    }

    /**
     * Retorna todos os veículos cadastrados.
     *
     * @return Lista de veículos.
     */
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    /**
     * Retorna um veículo pelo ID.
     *
     * @param id ID do veículo.
     * @return O veículo correspondente ou null.
     */
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    /**
     * Pesquisa veículos com base em parâmetros opcionais.
     *
     * @param brandName Nome da marca.
     * @param modelId ID do modelo.
     * @param minPrice Preço mínimo.
     * @param maxPrice Preço máximo.
     * @param status Status do veículo.
     * @return Lista de veículos que atendem aos critérios.
     */
    public List<Vehicle> searchVehicles(String brandName, Long modelId, Double minPrice, Double maxPrice, String status) {
        Specification<Vehicle> spec = Specification.where(VehicleSpecifications.hasBrand(brandName))
                .and(VehicleSpecifications.hasModelId(modelId)) // Alterado para usar ID do modelo
                .and(VehicleSpecifications.hasPriceBetween(minPrice, maxPrice))
                .and(VehicleSpecifications.hasStatus(status));

        return vehicleRepository.findAll(spec);
    }

    /**
     * Atualiza os dados de um veículo existente.
     *
     * @param id ID do veículo a ser atualizado.
     * @param vehicleDetails Dados atualizados do veículo.
     * @return O veículo atualizado.
     * @throws IllegalArgumentException Se o veículo não for encontrado.
     */
    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Veículo não encontrado com ID: " + id));

        vehicle.setYear(vehicleDetails.getYear());
        vehicle.setColor(vehicleDetails.getColor());
        vehicle.setPrice(vehicleDetails.getPrice());
        vehicle.setMileage(vehicleDetails.getMileage());
        vehicle.setStatus(vehicleDetails.getStatus());

        Brand brand = brandRepository.findByName(vehicleDetails.getBrand().getName());
        if (brand == null) {
            throw new IllegalArgumentException("Marca não encontrada: " + vehicleDetails.getBrand().getName());
        }

        VehicleModel model = vehicleModelRepository.findById(vehicleDetails.getModel().getId())
                .orElseThrow(() -> new IllegalArgumentException("Modelo não encontrado com ID: " + vehicleDetails.getModel().getId()));

        vehicle.setBrand(brand);
        vehicle.setModel(model);

        return vehicleRepository.save(vehicle);
    }

    /**
     * Exclui um veículo pelo ID.
     *
     * @param id ID do veículo a ser excluído.
     * @throws IllegalArgumentException Se o veículo não for encontrado.
     */
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Veículo não encontrado com ID: " + id));

        vehicleRepository.delete(vehicle);
    }

    /**
     * Retorna um modelo de veículo pelo ID.
     *
     * @param id ID do modelo.
     * @return O modelo correspondente.
     * @throws IllegalArgumentException Se o modelo não for encontrado.
     */
    public VehicleModel getModelById(Long id) {
        return vehicleModelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Modelo não encontrado com ID: " + id));
    }
}
