package com.example.vehicle_management.Model;

import org.springframework.data.jpa.domain.Specification;

public class VehicleSpecifications {

    public static Specification<Vehicle> hasBrand(String brandName) {
        return (root, _, criteriaBuilder) -> {
            if (brandName == null || brandName.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // Sem filtro
            }
            return criteriaBuilder.equal(root.get("brand").get("name"), brandName);
        };
    }

    public static Specification<Vehicle> hasModel(String modelName) {
        return (root, _, criteriaBuilder) -> {
            if (modelName == null || modelName.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // Sem filtro
            }
            return criteriaBuilder.equal(root.get("model").get("name"), modelName);
        };
    }

    // Método para filtrar veículos pelo ID do modelo
    public static Specification<Vehicle> hasModelId(Long modelId) {
        return (root, _, criteriaBuilder) -> {
            if (modelId == null) {
                return criteriaBuilder.conjunction(); // Sem filtro
            }
            return criteriaBuilder.equal(root.get("model").get("id"), modelId);
        };
    }

    public static Specification<Vehicle> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (root, _, criteriaBuilder) -> {
            if (minPrice == null && maxPrice == null) {
                return criteriaBuilder.conjunction(); // Sem filtro
            } else if (minPrice == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
            } else if (maxPrice == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
            } else {
                return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
            }
        };
    }

    public static Specification<Vehicle> hasStatus(String status) {
        return (root, _, criteriaBuilder) -> {
            if (status == null || status.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // Sem filtro
            }
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}
