package com.example.BugTrackerApplication.dto;

public class BugResponseDTO {
    
    private Long id;
    private String title;
    private String status;
    private String assignee;
    private String project;
    
    public BugResponseDTO() {
    }

    public BugResponseDTO(Long id, String title, String status, String assignee, String project) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.assignee = assignee;
        this.project = project;
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

}
