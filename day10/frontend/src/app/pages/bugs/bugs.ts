import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
 
import { BugService, Bug } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
 
@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './bugs.html',
  styleUrls: ['./bugs.css']
})
 
export class BugsComponent implements OnInit{
  bugs:Bug[]=[];
  filteredBugs:Bug[]=[];

  paginatedBugs:Bug[]=[];

  //dynamic dropdown options
  statusOptions: {label: string, value: string}[] = [];
  priorityOptions: {label: string, value: string}[] = [];
  
  selectedStatus:string='';
  selectedPriority:string='';
  
  // Pagination
  currentPage:number=1;
  itemsPerPage:number=5;
  totalPages:number=0;
  
  // Sorting
  sortColumn:string='';
  sortDirection:'asc'|'desc'='asc';
  
  // Form handling
  showAddForm:boolean=false;
  showEditForm:boolean=false;
  successMessage:string='';
  
  newBug:Bug = {
    id: null,
    title: '',
    status: 'Open',
    assignee: '',
    project: '',
    priority: 'MEDIUM'
  };
  
  editBug:Bug = {
    id: null,
    title: '',
    status: '',
    assignee: '',
    project: '',
    priority: 'MEDIUM'
  };

  error='';
  
  get canAddBug(): boolean {
    try {
      return this.authService.isAdmin();
    } catch {
      return false;
    }
  }
  
  get canEditBug(): boolean {
    try {
      return this.authService.isAdmin() || this.authService.isDeveloper();
    } catch {
      return false;
    }
  }
  constructor(
    private bugService: BugService, 
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(){
    this.loadBugs();
    // Test toast on component load
    setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Welcome',
        detail: 'Bug tracker loaded successfully'
      });
    }, 1000);
  }



  generateDynamicOptions(){
    // Generate unique status options from bug data
    const uniqueStatuses = [...new Set(this.bugs.map(bug => bug.status))];
    this.statusOptions = [
      { label: 'None', value: '' },
      ...uniqueStatuses.map(status => ({
        label: status,
        value: status
      }))
    ];
    
    // Generate unique priority options from bug data
    const uniquePriorities = [...new Set(this.bugs.map(bug => bug.priority))];
    this.priorityOptions = [
      { label: 'None', value: '' },
      ...uniquePriorities.map(priority => ({
        label: priority,
        value: priority
      }))
    ];
  }
  filterBugs(){
    this.filteredBugs=this.bugs.filter(bug=>
    (this.selectedStatus === '' || bug.status === this.selectedStatus) && 
    (this.selectedPriority === '' || bug.priority === this.selectedPriority)
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  
  updatePagination(){
    this.totalPages = Math.ceil(this.filteredBugs.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBugs = this.filteredBugs.slice(startIndex, endIndex);
  }
  
  goToPage(page:number){
    if(page >= 1 && page <= this.totalPages){
      this.currentPage = page;
      this.updatePagination();
    }
  }
  
  sortBy(column:string){
    if(this.sortColumn === column){
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.filteredBugs.sort((a:any, b:any) => {
      const aVal = a[column];
      const bVal = b[column];
      
      if(aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if(aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.updatePagination();
  }
  
  openAddForm(){
    console.log('Opening add form');
    try {
      this.showAddForm = true;
      this.error = '';
      this.successMessage = '';
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to open add form'
      });
    }
  }
  
  closeAddForm(){
    this.showAddForm = false;
    this.newBug = {
      id: null,
      title: '',
      status: 'Open',
      assignee: '',
      project: '',
      priority: 'MEDIUM'
    };
  }
  
  addBug(){
    console.log('Adding bug:', this.newBug);
    
    // Validate form data
    if (!this.newBug.title?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Bug title is required'
      });
      return;
    }
    
    if (!this.newBug.assignee?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Assignee is required'
      });
      return;
    }
    
    if (!this.newBug.project?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Project is required'
      });
      return;
    }
    
    this.bugService.createBug(this.newBug).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bug added successfully!'
        });
        this.loadBugs();
        this.closeAddForm();
      },
      error: (err) => {
        console.error('Error adding bug:', err);
        // Fallback: add bug locally
        try {
          const newBug = { ...this.newBug, id: Date.now() };
          this.bugs.push(newBug);
          this.filterBugs();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Bug added locally (API unavailable)'
          });
          this.closeAddForm();
        } catch (fallbackError) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add bug: ' + (err.message || 'Unknown error')
          });
        }
      }
    });
  }
  
  openEditForm(bug: Bug){
    console.log('Opening edit form for bug:', bug);
    try {
      if (!bug || !bug.id) {
        throw new Error('Invalid bug data');
      }
      this.editBug = { ...bug };
      this.showEditForm = true;
      this.error = '';
      this.successMessage = '';
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to open edit form: Invalid bug data'
      });
    }
  }
  
  closeEditForm(){
    this.showEditForm = false;
  }
  
  updateBug(){
    console.log('Updating bug:', this.editBug);
    
    // Validate form data
    if (!this.editBug.title?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Bug title is required'
      });
      return;
    }
    
    if (!this.editBug.assignee?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Assignee is required'
      });
      return;
    }
    
    if (!this.editBug.project?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Project is required'
      });
      return;
    }
    
    if (!this.editBug.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid bug ID'
      });
      return;
    }
    
    this.bugService.updateBug(this.editBug.id!, this.editBug).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bug updated successfully!'
        });
        this.loadBugs();
        this.closeEditForm();
      },
      error: (err) => {
        console.error('Error updating bug:', err);
        // Fallback: update bug locally
        try {
          const index = this.bugs.findIndex(b => b.id === this.editBug.id);
          if (index > -1) {
            this.bugs[index] = { ...this.editBug };
            this.filterBugs();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Bug updated locally (API unavailable)'
            });
          } else {
            throw new Error('Bug not found in local data');
          }
          this.closeEditForm();
        } catch (fallbackError) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update bug: ' + (err.message || 'Unknown error')
          });
          this.closeEditForm();
        }
      }
    });
  }
  
  loadBugs(){
    this.bugService.getBugs().subscribe({
      next:(data)=>{
        try {
          this.bugs=data || [];
          this.filteredBugs=data || [];
          this.generateDynamicOptions();
          this.updatePagination();
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Data Processing Error',
            detail: 'Failed to process bug data'
          });
        }
      },
      error:(err)=>{
        this.error=err.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Loading Error',
          detail: 'Failed to load bugs: ' + (err.message || 'Server unavailable')
        });
      }
    });
  }

  confirmDelete(bug: Bug) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete bug "${bug.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteBug(bug);
      }
    });
  }

  deleteBug(bug: Bug) {
    try {
      if (!bug || !bug.id) {
        throw new Error('Invalid bug data');
      }
      
      // Since there's no delete API endpoint, simulate deletion
      const index = this.bugs.findIndex(b => b.id === bug.id);
      if (index > -1) {
        this.bugs.splice(index, 1);
        this.filterBugs();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Bug "${bug.title}" deleted successfully`
        });
      } else {
        throw new Error('Bug not found');
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Delete Error',
        detail: `Failed to delete bug: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }
} 
 