package com.example.BugTrackerApplication.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
public class Login {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String username;
    public String password;

    public Login(){

    }
    public Login(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
