import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { BugService, Bug } from '../../services/bug.service';
 
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

  error='';
  constructor(private bugService: BugService){}

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
} 
 