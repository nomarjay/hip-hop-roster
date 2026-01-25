package com.hiphoproster.service;

import com.hiphoproster.dto.LoginRequest;
import com.hiphoproster.dto.LoginResponse;
import com.hiphoproster.model.AdminUser;
import com.hiphoproster.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminUserRepository adminUserRepository;

    public LoginResponse login(LoginRequest request) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        AdminUser user = userOpt.get();

        // Simple password check (in production, use BCrypt)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate simple token (in production, use JWT)
        String token = Base64.getEncoder().encodeToString(
                (user.getUsername() + ":" + UUID.randomUUID()).getBytes()
        );

        return new LoginResponse(token, user.getUsername(), user.getRole());
    }

    public AdminUser createAdmin(String username, String password) {
        if (adminUserRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        AdminUser admin = new AdminUser();
        admin.setUsername(username);
        admin.setPassword(password);
        admin.setRole("ADMIN");

        return adminUserRepository.save(admin);
    }
}