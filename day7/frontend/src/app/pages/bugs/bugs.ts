import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { BugService, Bug } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
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
    return this.authService.isAdmin();
  }
  
  get canEditBug(): boolean {
    return this.authService.isAdmin() || this.authService.isDeveloper();
  }
  constructor(private bugService: BugService, private authService: AuthService){}

  ngOnInit(){
    this.bugService.getBugs().subscribe({
        next:(data)=>{
            this.bugs=data;
            this.filteredBugs=data;
            this.generateDynamicOptions();
            this.updatePagination();
        },
        error:(err)=>{
            this.error=err.message;
        }
    });
    
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
    if (!this.authService.isAdmin()) {
      this.error = 'Only admins can add bugs';
      return;
    }
    this.showAddForm = true;
    this.successMessage = '';
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
    this.bugService.createBug(this.newBug).subscribe({
      next: (response) => {
        this.successMessage = 'Bug added successfully!';
        this.loadBugs();
        this.closeAddForm();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.error = 'Failed to add bug: ' + err.message;
      }
    });
  }
  
  openEditForm(bug: Bug){
    if (!this.authService.isAdmin() && !this.authService.isDeveloper()) {
      this.error = 'Access denied';
      return;
    }
    this.editBug = { ...bug };
    this.showEditForm = true;
    this.successMessage = '';
  }
  
  closeEditForm(){
    this.showEditForm = false;
  }
  
  updateBug(){
    this.bugService.updateBug(this.editBug.id!, this.editBug).subscribe({
      next: (response) => {
        this.successMessage = 'Bug updated successfully!';
        this.loadBugs();
        this.closeEditForm();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.error = 'Failed to update bug: ' + err.message;
      }
    });
  }
  
  loadBugs(){
    this.bugService.getBugs().subscribe({
      next:(data)=>{
        this.bugs=data;
        this.filteredBugs=data;
        this.generateDynamicOptions();
        this.updatePagination();
      },
      error:(err)=>{
        this.error=err.message;
      }
    });
  }
} 
 