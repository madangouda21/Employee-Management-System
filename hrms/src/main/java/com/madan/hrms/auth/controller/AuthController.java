package com.madan.hrms.auth.controller;

import com.madan.hrms.auth.dto.LoginRequest;
import com.madan.hrms.auth.dto.LoginResponse;
import com.madan.hrms.auth.dto.RegisterRequest;
import com.madan.hrms.auth.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*")
public class AuthController {

    private final AuthService userService;

    public AuthController(AuthService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest request){
        userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return userService.login(request);
    }
}