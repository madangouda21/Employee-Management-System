package com.madan.hrms.auth.service;

import com.madan.hrms.auth.dto.LoginRequest;
import com.madan.hrms.auth.dto.LoginResponse;
import com.madan.hrms.auth.dto.RegisterRequest;
import com.madan.hrms.auth.entity.User;
import com.madan.hrms.auth.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register new user
    public void register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encode password before saving
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);

        user.setRole(request.getRole());

        userRepository.save(user);
    }

    // Login user
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check password using BCrypt
        boolean passwordMatches =
                passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                "dummy-jwt-token",
                user.getEmail(),
                user.getRole()
        );
    }
}