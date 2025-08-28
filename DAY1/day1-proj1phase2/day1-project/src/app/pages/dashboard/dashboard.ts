import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  totalBugs = 24;
  openBugs = 8;
  closedBugs = 16;
  criticalBugs = 3;

  recentActivities = [
    { icon: '🐛', title: 'New bug reported: Login issue', time: '2 hours ago' },
    { icon: '✅', title: 'Bug fixed: Payment gateway error', time: '4 hours ago' },
    { icon: '🔄', title: 'Bug updated: UI alignment issue', time: '6 hours ago' },
    { icon: '🐞', title: 'Critical bug assigned to developer', time: '1 day ago' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  showAddBugModal() {
    // Navigate to bugs page with add mode
    this.router.navigate(['/bugs'], { queryParams: { action: 'add' } });
  }

  generateReport() {
    alert('Report generation feature coming soon!');
  }
}
