package com.example.BugTrackerApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.BugTrackerApplication.entity.Bug;
import com.example.BugTrackerApplication.entity.Priority;
import com.example.BugTrackerApplication.repository.BugRepository;

@SpringBootApplication
public class BugTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApplication.class, args);
	}

	@Bean
	public org.springframework.web.servlet.config.annotation.WebMvcConfigurer corsConfigurer() {
		return new org.springframework.web.servlet.config.annotation.WebMvcConfigurer() {
			@Override
			public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}

@Bean
    public CommandLineRunner loadData(BugRepository	 bugRepository) {
		return (args) -> {
			bugRepository.save(new Bug(null, "Bug 1", "Open", "Alice", "Project A", Priority.HIGH));
			bugRepository.save(new Bug(null, "Bug 2", "Closed", "Bob", "Project B", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Bug 3", "in-Progress", "Charlie", "Project A", Priority.LOW));
			bugRepository.save(new Bug(null, "Bug 4", "Open", "Alice", "Project B", Priority.HIGH));
			bugRepository.save(new Bug(null, "Login Issue", "Open", "David", "Project C", Priority.HIGH));
			bugRepository.save(new Bug(null, "Database Error", "in-Progress", "Eve", "Project A", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "UI Bug", "Closed", "Frank", "Project B", Priority.LOW));
			bugRepository.save(new Bug(null, "Performance Issue", "Open", "Grace", "Project C", Priority.HIGH));
			bugRepository.save(new Bug(null, "Memory Leak", "in-Progress", "Henry", "Project A", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Crash on Startup", "Open", "Ivy", "Project B", Priority.HIGH));
			bugRepository.save(new Bug(null, "Slow Loading", "Closed", "Jack", "Project C", Priority.LOW));
			bugRepository.save(new Bug(null, "API Timeout", "in-Progress", "Kate", "Project A", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Form Validation", "Open", "Leo", "Project B", Priority.LOW));
			bugRepository.save(new Bug(null, "Security Flaw", "Closed", "Mia", "Project C", Priority.HIGH));
			bugRepository.save(new Bug(null, "CSS Layout", "in-Progress", "Noah", "Project A", Priority.LOW));
			bugRepository.save(new Bug(null, "Data Loss", "Open", "Olivia", "Project B", Priority.HIGH));
			bugRepository.save(new Bug(null, "Browser Compatibility", "Closed", "Paul", "Project C", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Email Notification", "in-Progress", "Quinn", "Project A", Priority.LOW));
			bugRepository.save(new Bug(null, "File Upload", "Open", "Ruby", "Project B", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Search Function", "Closed", "Sam", "Project C", Priority.LOW));
			bugRepository.save(new Bug(null, "Payment Gateway", "in-Progress", "Tina", "Project A", Priority.HIGH));
			bugRepository.save(new Bug(null, "Mobile Responsive", "Open", "Uma", "Project B", Priority.MEDIUM));
			bugRepository.save(new Bug(null, "Cache Issue", "Closed", "Victor", "Project C", Priority.LOW));
			bugRepository.save(new Bug(null, "Session Timeout", "in-Progress", "Wendy", "Project A", Priority.HIGH));
		};
	}
}
