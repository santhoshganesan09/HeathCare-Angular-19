import { Component, OnInit } from '@angular/core';
import { Cylinder } from '../../model/cylinder/cylinder.model';
import { AuthServiceService } from '../../service/auth-service.service';
import { CylinderService } from '../../service/cylinder.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-cylinder-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './staff-cylinder-list.component.html',
  styleUrl: './staff-cylinder-list.component.css'
})
export class StaffCylinderListComponent implements OnInit{
 cylinders: Cylinder[] = [];
   newCylinder: Partial<Cylinder> = {
     pressure: 0,
     temperature: 0,
     status: '',
     location: ''
 
 };
 
   constructor(private authService: AuthServiceService,private cylinderService:CylinderService) {}
 

  logout() {
    this.authService.logout();
  }

  //cylinder list
  ngOnInit(): void {
    this.loadCylinders(); // Load the cylinders initially

// Keep the component alive for 1 second
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