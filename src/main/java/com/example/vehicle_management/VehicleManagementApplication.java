package com.example.vehicle_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication 
@EntityScan(basePackages = "com.example.vehicle_management.Model") 

public class VehicleManagementApplication {
    public static void main(String[] args) {
        // Executa a aplicação Spring Boot
        SpringApplication.run(VehicleManagementApplication.class, args);
    }
}
