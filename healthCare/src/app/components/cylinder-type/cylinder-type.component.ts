import { Component } from '@angular/core';
import { CylinderTypeService } from '../../service/cylinder-type.service';
import { CylinderType } from '../../model/cylinder-type/cylinder-type.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-cylinder-type',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cylinder-type.component.html',
  styleUrl: './cylinder-type.component.css'
})
export class CylinderTypeComponent {
   cylinderTypes: CylinderType[] = [];

  newType: CylinderType = {
   
    name: '',
    capacity: '',
    materialOfCylinder: '',
    manufacturer: '',
    usageGuidelines: ''
  };

   selectedType: CylinderType = {
 
  name: '',
  capacity: '',
  materialOfCylinder: '',
  manufacturer: '',
  usageGuidelines: ''
};

  //selectedType: CylinderType | null = null;

  constructor(private cylinderTypeService: CylinderTypeService) {}

  ngOnInit(): void {
    this.loadCylinderTypes();
  }

  loadCylinderTypes(): void {
    this.cylinderTypeService.getAllCylinderTypes().subscribe({
      next: (data) => {
        this.cylinderTypes = data;
        console.log('Fetched cylinder types:', data);
      },
      error: (err) => {
        console.error('Error fetching cylinder types:', err);
      }
    });
  }

  addCylinderType(): void {
    console.log('Payload being sent:', this.newType); // ← Add this
    this.cylinderTypeService.createCylinderType(this.newType).subscribe({
      next: (type) => {
        this.cylinderTypes.push(type);
        this.resetNewType();
      },
      error: (err) => {
        console.error('Error adding cylinder type:', err);
      }
    });
  }

  editCylinderType(type: CylinderType): void {
    this.selectedType = { ...type };
  }

  saveEditedType(): void {
    if (this.selectedType?.id) {
      this.cylinderTypeService.updateCylinderType(this.selectedType.id, this.selectedType).subscribe({
        next: () => {
          this.loadCylinderTypes();
          this.resetNewType();

            // Close the modal
          const modalElement = document.getElementById('editModal3');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Error updating cylinder type:', err);
        }
      });
    }
  }

  deleteCylinderType(id: number | undefined): void {
    if (id) { // Check if ID is valid
    this.cylinderTypeService.deleteCylinderType(id).subscribe({
      next: () => {
        this.cylinderTypes = this.cylinderTypes.filter(type => type.id !== id);
      },
      error: (err) => {
        console.error('Error deleting cylinder type:', err);
      }
    });
  } else {
    console.error('Invalid ID:', id); // Debugging message
  }
  }

  resetNewType(): void {
    this.newType = {
     
    name: '',
    capacity: '',
    materialOfCylinder: '',
    manufacturer: '',
    usageGuidelines: ''
    };
  }

    resetSelectedType(): void {
    this.selectedType = {
      
      name: '',
      capacity: '',
      materialOfCylinder: '',
      manufacturer: '',
      usageGuidelines: ''
    };
  }

  cancelEdit(): void {
    this.resetSelectedType();
  }
}
