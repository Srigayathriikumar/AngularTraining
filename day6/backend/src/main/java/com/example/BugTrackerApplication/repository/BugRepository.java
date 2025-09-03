package com.example.BugTrackerApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BugTrackerApplication.entity.Bug;

public interface BugRepository extends JpaRepository<Bug, Long> {
  
    
}
