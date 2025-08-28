import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdDate: string;
}

@Component({
  selector: 'app-bugs',
  imports: [CommonModule, FormsModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [
    {
      id: 1,
      title: 'Login page not responsive',
      description: 'The login page breaks on mobile devices',
      status: 'Open',
      priority: 'High',
      assignedTo: 'John Doe',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Payment gateway timeout',
      description: 'Payment processing takes too long and times out',
      status: 'In Progress',
      priority: 'Critical',
      assignedTo: 'Jane Smith',
      createdDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'UI alignment issue',
      description: 'Buttons are misaligned in the dashboard',
      status: 'Closed',
      priority: 'Low',
      assignedTo: 'Mike Johnson',
      createdDate: '2024-01-13'
    }
  ];

  filteredBugs: Bug[] = [];
  searchTerm = '';
  selectedStatus = '';
  selectedPriority = '';
  
  showModal = false;
  showViewModal = false;
  isEditing = false;
  viewingBug: Bug | null = null;
  
  currentBug: Bug = {
    id: 0,
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    assignedTo: '',
    createdDate: ''
  };

  ngOnInit() {
    this.filteredBugs = [...this.bugs];
  }

  filterBugs() {
    this.filteredBugs = this.bugs.filter(bug => {
      const matchesSearch = bug.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           bug.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || bug.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || bug.priority === this.selectedPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  showAddModal() {
    this.isEditing = false;
    this.currentBug = {
      id: 0,
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      assignedTo: '',
      createdDate: ''
    };
    this.showModal = true;
  }

  editBug(bug: Bug) {
    this.isEditing = true;
    this.currentBug = { ...bug };
    this.showModal = true;
  }

  viewBug(bug: Bug) {
    this.viewingBug = bug;
    this.showViewModal = true;
  }

  saveBug() {
    if (this.isEditing) {
      const index = this.bugs.findIndex(b => b.id === this.currentBug.id);
      if (index !== -1) {
        this.bugs[index] = { ...this.currentBug };
      }
    } else {
      this.currentBug.id = Math.max(...this.bugs.map(b => b.id)) + 1;
      this.currentBug.createdDate = new Date().toISOString().split('T')[0];
      this.bugs.push({ ...this.currentBug });
    }
    
    this.filterBugs();
    this.closeModal();
  }

  deleteBug(id: number) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.bugs = this.bugs.filter(bug => bug.id !== id);
      this.filterBugs();
    }
  }

  closeModal(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('modal-content')) {
      return;
    }
    this.showModal = false;
  }

  closeViewModal(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('modal-content')) {
      return;
    }
    this.showViewModal = false;
    this.viewingBug = null;
  }
}
