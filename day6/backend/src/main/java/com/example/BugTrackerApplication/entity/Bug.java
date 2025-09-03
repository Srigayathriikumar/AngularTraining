package com.example.BugTrackerApplication.entity;

import jakarta.persistence.*;

@Entity
// @Table(name="bugdata")
public class Bug {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String status;
    private String assignee;
    private String project;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    public Bug() {
    }
    public Bug(Long id, String title, String status, String assignee, String project, Priority priority) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.assignee = assignee;
        this.project = project;
        this.priority = priority;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getAssignee() {
        return assignee;
    }
    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }
    public String getProject() {
        return project;
    }
    public void setProject(String project) {
        this.project = project;
    }
    public Priority getPriority() {
        return priority;
    }
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
