import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service';
import { CylinderService } from '../../service/cylinder.service';
import { Inventory } from '../../model/inventory/inventory.model';
import { Cylinder } from '../../model/cylinder/cylinder.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { filter } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-inventory',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
   userRole: string | null = ''
  dashboardLink: string = '/admin-dashboard';
isAdmin: boolean = false;

   inventories: Inventory[] = [];
  cylinders: Cylinder[] = [];

  newInventory: Partial<Inventory> = {
    quantity: 0,
    location: '',
    status: '',
    lastChecked: undefined,
    cylinder: { cylinderId: 0 }
  };

  isEditing: boolean = false;
  editId?: number | null = null;

  editInventoryData: Partial<Inventory> = {
    quantity: 0,
    location: '',
    status: '',
    lastChecked: undefined,
    cylinder: {
      cylinderId: 0
    }
  };

  constructor(
    private inventoryService: InventoryService,
    private cylinderService: CylinderService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRole();
    this.getAllInventories();
    this.getAllCylinders();


            // Listen for route changes and update role dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadRole();
      });
  }


    loadRole(): void {
  this.userRole = this.authService.getRole();
  //console.log('User role refreshed:', this.userRole);
      // Set dashboard link based on role
  if (this.userRole === 'ADMIN') {
    this.dashboardLink = '/admin-dashboard';
  } else {
    this.dashboardLink = '/staff-dashboard';
  }
  //console.log('User role refreshed:', this.userRole);
}

  getAllInventories(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => this.inventories = data,
      error: (err) => console.error('Failed to fetch inventories:', err)
    });
  }

  getAllCylinders(): void {
    this.cylinderService.getAllCylinders().subscribe({
      next: (data) => this.cylinders = data,
      error: (err) => console.error('Failed to fetch cylinders:', err)
    });
  }

  addInventory(): void {
    // Call add API for new inventory
    this.inventoryService.addInventory(this.newInventory as Inventory).subscribe({
      next: (data) => {
        this.inventories.push(data);
        console.log('Inventory added successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Failed to add inventory:', err)
    });
  }

editInventory(inventory: Inventory): void {
  // Format date to yyyy-MM-dd
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  this.editInventoryData = {
    id: inventory.id,
    quantity: inventory.quantity,
    location: inventory.location,
    status: inventory.status,
    lastChecked: inventory.lastChecked ? formatDate(inventory.lastChecked) : '',
    cylinder: { cylinderId: inventory.cylinder?.cylinderId || 0 }
  };
}


  saveInventory(): void {
    if (this.editInventoryData && this.editInventoryData.id) {
      const updatedInventory = {
        ...this.editInventoryData,
        lastChecked: this.editInventoryData.lastChecked
          ? new Date(this.editInventoryData.lastChecked)
          : null,
        cylinder: { cylinderId: Number(this.editInventoryData.cylinder?.cylinderId) }
      };

      this.inventoryService.updateInventory(this.editInventoryData.id, updatedInventory as Inventory).subscribe({
        next: (updated) => {
          const index = this.inventories.findIndex(i => i.id === updated.id);
          if (index !== -1) {
            this.inventories[index] = updated;
          }
          this.resetForm();

          // Close modal manually
          const modalElement = document.getElementById('editModal1');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
            
          }
            location.reload(); // Reload the page to reflect changes
          console.log('Inventory updated successfully!');
        },
        error: (err) => console.error('Error updating inventory:', err)
      });
    }
  }

  deleteInventory(id: number): void {
    this.inventoryService.deleteInventory(id).subscribe({
      next: () => {
        this.inventories = this.inventories.filter(i => i.id !== id);
        console.log('Inventory deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete inventory:', err);
        alert("Unable to delete. This inventory may be linked to another record.");
      }
    });
  }

  resetForm(): void {
    this.newInventory = {
      quantity: 0,
      location: '',
      status: '',
      cylinder: { cylinderId: 0 }
    };
    this.editInventoryData = {
      quantity: 0,
      location: '',
      status: '',
      cylinder: { cylinderId: 0 }
    };
    this.isEditing = false;
    this.editId = null;
  }
}









