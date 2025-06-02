import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CylinderListComponent } from "../cylinder-list/cylinder-list.component";
import { CylinderService } from '../../service/cylinder.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cylinder } from '../../model/cylinder/cylinder.model';
import { StaffCylinderListComponent } from "../staff-cylinder-list/staff-cylinder-list.component";
import { StaffDefectReportComponent } from "../staff-defect-report/staff-defect-report.component";
import { StaffHeaderMessageComponent } from "../staff-header-message/staff-header-message.component";
import { Router, RouterLink } from '@angular/router';
import { DefectReportComponent } from "../defect-report/defect-report.component";
import { MaintenanceScheduleComponent } from "../maintenance-schedule/maintenance-schedule.component";
import { InvventoryAlertComponent } from "../invventory-alert/invventory-alert.component";
import { InventoryComponent } from "../inventory/inventory.component";

@Component({
  selector: 'app-staff-dashbord',
  imports: [FormsModule, CommonModule, NavbarComponent, CylinderListComponent,
    StaffCylinderListComponent, StaffDefectReportComponent, RouterLink,
    StaffHeaderMessageComponent, DefectReportComponent, MaintenanceScheduleComponent, InvventoryAlertComponent, InventoryComponent],
  templateUrl: './staff-dashbord.component.html',
  styleUrl: './staff-dashbord.component.css'
})
export class StaffDashbordComponent implements OnInit {
cylinders: Cylinder[] = [];
  newCylinder: Partial<Cylinder> = {
    pressure: 0,
    temperature: 0,
    status: '',
    location: ''

};
  constructor(private authService: AuthServiceService,private cylinderService:CylinderService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();

  }

  //cylinder list
  ngOnInit(): void {
    this.loadCylinders(); // Load the cylinders initially

   
    
  }

  loadCylinders(): void {
    this.cylinderService.getAllCylinders().subscribe((data: Cylinder[]) => {
      this.cylinders = data;
    });
}

addCylinder(): void {
    console.log("Adding cylinder:", this.newCylinder);

    this.cylinderService.createCylinder(this.newCylinder).subscribe({
      next: (data: Cylinder) => {
        this.cylinders.push(data); // Add the new cylinder to the list
        this.newCylinder = {
          pressure: 0,
          temperature: 0,
          status: '',
          location: ''
        }; // Reset form after submission
      },
      error: (err) => {
        console.error('Failed to add cylinder:', err);
      }
    });
  }


}