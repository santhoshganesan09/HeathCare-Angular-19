import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaintenanceServiceService } from '../../service/maintenance-service.service';
import { MaintenanceSchedule } from '../../model/maintenance-schedule/maintenance-schedule.model';
import { UserServiceService } from '../../service/user-service.service';
import { CylinderService } from '../../service/cylinder.service';
import { Cylinder } from '../../model/cylinder/cylinder.model';
import { User } from '../../model/user/user.model';
import { WorkOrderComponent } from "../work-order/work-order.component";
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-maintenance-schedule',
  imports: [FormsModule, CommonModule, WorkOrderComponent,RouterLink],
  templateUrl: './maintenance-schedule.component.html',
  styleUrl: './maintenance-schedule.component.css'
})
export class MaintenanceScheduleComponent implements OnInit {
  userRole: string | null = '';
  // Define the schedules, technicians, and cylinders arrays
  // These will hold the data fetched from the backend
  // Define the newSchedule object to hold the data for a new maintenance schedule

  dashboardLink: string = '/admin-dashboard';
isAdmin: boolean = false;
schedules: MaintenanceSchedule[] = [];
  technicians: User[] = [];
  cylinders: Cylinder[] = [];

  newSchedule: MaintenanceSchedule = {
    scheduledDate: '',
    frequency: '',
    status: '',
    maintenanceType: '',
    cylinder: { cylinderId: 0 },
    technicianAssigned: { id: 0 }
  };

  selectedSchedule: MaintenanceSchedule | null = null;

  constructor(
    private scheduleService: MaintenanceServiceService,
    private userService: UserServiceService,
    private cylinderService: CylinderService,
    private authService: AuthServiceService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.loadRole();
    // Load all maintenance schedules, technicians, and cylinders when the component initializes
    this.loadSchedules();
    this.loadTechnicians();
    this.loadCylinders();


  // Listen for route changes and update role dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadRole();
      });


      
 

  }



loadRole(): void {
  this.userRole = this.authService.getRole();
    // Set dashboard link based on role
  if (this.userRole === 'ADMIN') {
    this.dashboardLink = '/admin-dashboard';
  } else {
    this.dashboardLink = '/staff-dashboard';
  }
  //console.log('User role refreshed:', this.userRole);
}

  // Load all maintenance schedules
  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        //console.log('Fetched maintenance schedules:', data);
      },
      error: (err) => {
        console.error('Error fetching maintenance schedules:', err);
      }
    });
  }

  // Load all technicians (users)
  loadTechnicians(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.technicians = data;
        //console.log('Fetched technicians:', data);
      },
      error: (err) => {
        console.error('Error fetching technicians:', err);
      }
    });
  }

  // Load all cylinders
  loadCylinders(): void {
    this.cylinderService.getAllCylinders().subscribe({
      next: (data) => {
        this.cylinders = data;
        //console.log('Fetched cylinders:', data);
      },
      error: (err) => {
        console.error('Error fetching cylinders:', err);
      }
    });
  }

  // Add a new maintenance schedule
  addSchedule(): void {
    this.scheduleService.addSchedule(this.newSchedule).subscribe({
      next: (schedule) => {
        this.schedules.push(schedule);
        this.resetNewSchedule();
      },
      error: (err) => {
        console.error('Error adding maintenance schedule:', err);
      }
    });
  }

  // Edit an existing maintenance schedule
  editSchedule(schedule: MaintenanceSchedule): void {
    this.selectedSchedule = JSON.parse(JSON.stringify(schedule));
    //console.log('Editing schedule:', this.selectedSchedule);
  }

  // Save the edited schedule
  saveSelectedSchedule(): void {
    //console.log('Selected Schedule Before Save:', this.selectedSchedule); // Add this for debugging
    if (this.selectedSchedule?.id) {
      this.scheduleService.updateSchedule(this.selectedSchedule.id, this.selectedSchedule).subscribe({
        next: () => {
          this.loadSchedules();
          this.selectedSchedule = null;
        },
        error: (err) => {
          console.error('Error updating maintenance schedule:', err);
        }
      });
    }
  }

  // Cancel editing a schedule
  cancelEdit(): void {
    this.selectedSchedule = null;
  }

  // Delete a maintenance schedule
  deleteSchedule(id: number): void {
    this.scheduleService.deleteSchedule(id).subscribe({
      next: () => {
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
      },
      error: (err) => {
        console.error('Error deleting maintenance schedule:', err);
      }
    });
  }

  // Reset new schedule object
  resetNewSchedule(): void {
    this.newSchedule = {
      scheduledDate: '',
      frequency: '',
      status: '',
      maintenanceType: '',
      cylinder: { cylinderId: 0 },
      technicianAssigned: { id: 0 }
    };
  }
}
