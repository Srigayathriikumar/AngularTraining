package com.example.BugTrackerApplication.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_BASE64="sKJ9J8yTzMvuQmA4l/0gkV5wW+fJjzt+QbW6RvzcsEk=";
    private static final long EXPIRATION_Ms=86400_000; // 24 hours

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_BASE64);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        return Jwts.builder()
        .setSubject(username)
        .claim("roles", getRolesForUser(username))
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_Ms))
        .signWith(getSigningKey(),SignatureAlgorithm.HS256)
        .compact();
    }
    
    private java.util.List<String> getRolesForUser(String username) {
        switch(username) {
            case "admin": return java.util.Arrays.asList("ADMIN");
            case "developer": return java.util.Arrays.asList("DEVELOPER");
            default: return java.util.Arrays.asList("USER");
        }
    }

    public String extractUsername(String token){
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            System.out.println("Error extracting username: " + e.getMessage());
            return null;
        }
    }
    
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    
    private boolean istokenexpired(String token){
        return extractExpiration(token).before(new Date());
    }
    
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    public boolean validateToken(String token,String username){
        try {
            String extractedUsername = extractUsername(token);
            boolean isValid = (extractedUsername != null && extractedUsername.equals(username) && !istokenexpired(token));
            System.out.println("Token validation - Username: " + extractedUsername + ", Valid: " + isValid);
            return isValid;
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }

    public boolean validateToken(String token,UserDetails UserDetails){
        return (extractUsername(token).equals(UserDetails.getUsername()) && !istokenexpired(token));
    }
}