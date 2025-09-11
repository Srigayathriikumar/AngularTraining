-- Create database (run this manually in PostgreSQL)
-- CREATE DATABASE bug_tracker;

-- Table will be auto-created by Hibernate with ddl-auto=update
-- But here's the manual schema for reference:

CREATE TABLE IF NOT EXISTS bugs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    assignee VARCHAR(100) NOT NULL,
    project VARCHAR(100) NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW'))
);