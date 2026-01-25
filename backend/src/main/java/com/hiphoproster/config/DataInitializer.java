package com.hiphoproster.config;

import com.hiphoproster.model.AdminUser;
import com.hiphoproster.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;

    @Override
    public void run(String... args) {
        // Create default admin if not exists
        if (adminUserRepository.findByUsername("admin").isEmpty()) {
            AdminUser admin = new AdminUser();
            admin.setUsername("admin");
            admin.setPassword("admin123"); // Change this in production!
            admin.setRole("ADMIN");
            adminUserRepository.save(admin);
            System.out.println("Default admin user created - Username: admin, Password: admin123");
        }
    }
}