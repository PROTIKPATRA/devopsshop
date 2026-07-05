package com.devopsshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> getSystemStatus() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "DevOpsShop Backend API",
                "version", "1.0.0"
        ));
    }
}