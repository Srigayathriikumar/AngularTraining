package com.example.BugTrackerApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.BugTrackerApplication.entity.Bug;
import com.example.BugTrackerApplication.repository.BugRepository;

@SpringBootApplication
public class BugTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApplication.class, args);
	}

	
@Bean
    public CommandLineRunner loadData(BugRepository	 bugRepository) {
		return (args) -> {
			bugRepository.save(new Bug(null, "Bug 1", "Open", "Alice", "Project A"));
			bugRepository.save(new Bug(null, "Bug 2", "Closed", "Bob", "Project B"));
			bugRepository.save(new Bug(null, "Bug 3", "In Progress", "Charlie", "Project A"));
			bugRepository.save(new Bug(null, "Bug 4", "Open", "Alice", "Project B"));
		};
	}
}
