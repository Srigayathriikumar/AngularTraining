# Bug Tracker Application

## Introduction
The Bug Tracker Application is a simple Spring Boot-based REST API for tracking bugs in software projects. It allows users to manage and filter bugs by status, assignee, and project.

## Description
This application provides endpoints to retrieve bug information based on various filters. It uses an in-memory database (or can be configured for PostgreSQL) and demonstrates basic CRUD operations and filtering using Spring Boot, Spring Data JPA, and RESTful APIs.

## Features
- List all bugs
- Filter bugs by status, assignee, and project
- Filter bugs by a combination of status, assignee, and project
- Preloaded sample data on startup

## APIs

| Method | Endpoint                                      | Description                                      |
|--------|-----------------------------------------------|--------------------------------------------------|
| GET    | `/api/bugs/status/{status}`                   | Get bugs by status                               |
| GET    | `/api/bugs/assignee/{assignee}`               | Get bugs by assignee                             |
| GET    | `/api/bugs/project/{project}`                 | Get bugs by project                              |
| GET    | `/api/bugs/{status}/{assignee}/{project}`     | Get bugs by status, assignee, and project        |

## Tech Stack
- Java 17+
- Spring Boot
- Spring Data JPA
- RESTful API
- (Optional) PostgreSQL or H2 Database