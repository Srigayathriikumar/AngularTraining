import { Component, OnInit } from "@angular/core";
import{ CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { CommonModule } from "@angular/common";
import { BugService, BugStats } from "./services/bug.service";

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports:[CommonModule,CardModule,ChartModule],
    templateUrl: `./admin-dashboard.component.html`,
    styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit{
    Stats?:BugStats;
    openResolvedData:any;
    bugsByPriorityData:any;
    bugsByProjectData:any
    bugsByStatusData:any;
    users: any[] = [];
    showUserChart = false;
    userChartData: any;
    report: any;
    showReportChart = false;
    reportChartData: any;
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };
    
    barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    constructor(private bugService: BugService){}

    ngOnInit(){
        this.bugService.getBugStats().subscribe({
            next: (stats) => {
                console.log('Bug stats received:', stats);
                this.Stats = stats;
                
                this.openResolvedData = {
                    labels: ['Open', 'Closed'],
                    datasets: [{
                        data: [stats.openVsClosed.open, stats.openVsClosed.closed],
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB']
                    }]
                };

                this.bugsByPriorityData = {
                    labels: Object.keys(stats.bugsByPriority),
                    datasets: [{
                        data: Object.values(stats.bugsByPriority),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                };

                this.bugsByProjectData = {
                    labels: Object.keys(stats.bugsByProject),
                    datasets: [{
                        data: Object.values(stats.bugsByProject),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                    }]
                };

                this.bugsByStatusData = {
                    labels: Object.keys(stats.bugByStatus),
                    datasets: [{
                        data: Object.values(stats.bugByStatus),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                    }]
                };
                
                console.log('Chart data prepared:', {
                    openResolvedData: this.openResolvedData,
                    bugsByPriorityData: this.bugsByPriorityData,
                    bugsByProjectData: this.bugsByProjectData,
                    bugsByStatusData: this.bugsByStatusData
                });
            },
            error: (error) => {
                console.error('Error loading bug stats:', error);
                // Set default data if API fails
                this.setDefaultChartData();
            }
        });
    }

    setDefaultChartData() {
        this.openResolvedData = {
            labels: ['Open', 'Closed'],
            datasets: [{ data: [5, 3], backgroundColor: ['#FF6384', '#36A2EB'] }]
        };
        this.bugsByPriorityData = {
            labels: ['HIGH', 'MEDIUM', 'LOW'],
            datasets: [{ data: [2, 4, 2], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
        };
        this.bugsByProjectData = {
            labels: ['Project A', 'Project B'],
            datasets: [{ data: [4, 4], backgroundColor: ['#FF6384', '#36A2EB'] }]
        };
        this.bugsByStatusData = {
            labels: ['Open', 'In Progress', 'Closed'],
            datasets: [{ data: [3, 2, 3], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
        };
    }

    addUser() {
        // Implementation for adding user
    }

    editUser(user: any) {
        // Implementation for editing user
    }

    deleteUser(user: any) {
        // Implementation for deleting user
    }

    generateReport() {
        this.report = { generated: new Date(), data: 'Sample report data' };
        this.showReportChart = true;
        this.reportChartData = { labels: ['Sample'], datasets: [{ data: [1] }] };
    }
}
