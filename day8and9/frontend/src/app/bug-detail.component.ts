import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { TextareaModule } from "primeng/textarea";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";

import { Bug, BugService, Comment } from "./services/bug.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
@Component({
    selector: 'app-bug-detail',
    standalone: true,
    imports:[CommonModule,CardModule,TextareaModule,ButtonModule,FormsModule,RouterLink],
    templateUrl: './bug-details.component.html'
})

export class BugDetailComponent implements OnInit{
    bug?:Bug;
    newComment: string = '';

    constructor(private bugService: BugService, private route: ActivatedRoute) {}
    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        console.log('Route param id:', idParam);
        const id = idParam !== null ? Number(idParam) : null;
        console.log('Parsed id:', id);
        
        if (id !== null && !isNaN(id)) {
            this.bugService.getBugById(id).subscribe({
                next: (bug) => {
                    console.log('Bug loaded:', bug);
                    this.bug = bug;
                    if (!this.bug.comments) {
                        this.bug.comments = [];
                    }
                },
                error: (error) => {
                    console.error('Error loading bug:', error);
                    // Fallback mock data when API fails
                    this.bug = {
                        id: id,
                        title: `Sample Bug #${id}`,
                        priority: 'HIGH',
                        status: 'Open',
                        assignee: 'John Doe',
                        project: 'Sample Project',
                        comments: [
                            {
                                id: 1,
                                author: 'Alice Smith',
                                message: 'This is a sample comment for demonstration.',
                                createdAt: '2024-01-15T10:30:00Z'
                            },
                            {
                                id: 2,
                                author: 'Bob Johnson',
                                message: 'Another sample comment to show the functionality.',
                                createdAt: '2024-01-16T14:20:00Z'
                            }
                        ]
                    };
                }
            });
        } else {
            console.error('Invalid bug ID:', idParam);
        }
    }


    addComment() {
        if (this.bug && this.newComment.trim() !== '') {
            const comment: Comment = { 
                id: Date.now(),
                author: 'Current User', 
                message: this.newComment.trim(),
                createdAt: new Date().toISOString()
            };
            
            if (this.bug.id !== null) {
                // Try API first
                this.bugService.addcomment(this.bug.id, comment).subscribe({
                    next: (addedComment: Comment) => {
                        if (!this.bug?.comments) {
                            this.bug!.comments = [];
                        }
                        this.bug?.comments?.push(addedComment);
                        this.newComment = '';
                    },
                    error: (error) => {
                        console.error('Error adding comment via API:', error);
                        // Fallback: add comment locally
                        this.addCommentLocally(comment);
                    }
                });
            } else {
                // Add comment locally
                this.addCommentLocally(comment);
            }
        }
    }

    addCommentLocally(comment: Comment) {
        if (!this.bug?.comments) {
            this.bug!.comments = [];
        }
        this.bug?.comments?.push(comment);
        this.newComment = '';
        console.log('Comment added locally:', comment);
    }

    clearComment() {
        this.newComment = '';
    }
} 