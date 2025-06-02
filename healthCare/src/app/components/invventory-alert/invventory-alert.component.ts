import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../model/inventory/inventory.model';
import { InventoryAlert } from '../../model/inventory-alert/inventory-alert.model';
import { InventoryAlertServiceService } from '../../service/inventory-alert-service.service';
import { InventoryService } from '../../service/inventory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { filter } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-invventory-alert',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './invventory-alert.component.html',
  styleUrl: './invventory-alert.component.css'
})
export class InvventoryAlertComponent implements OnInit {
 userRole: string | null = ''
  dashboardLink: string = '/admin-dashboard';
isAdmin: boolean = false;
  alerts:InventoryAlert[] = [];
  inventories:Inventory[] = [];

  newAlert:InventoryAlert = {
    alertType: '',
    message: '',
    resolved: false,
    createdAt: new Date(),
    inventory: {
      id: 0
    }
  };

 // isEditing: boolean = false;
  //editId?: number | null = null;

  editAlertData: Partial<InventoryAlert> = {
    alertType: '',
    message: '',
    resolved: false,
    inventory: { id: 0 },
    createdAt: new Date()
  };

  constructor(
    private inventoryAlertService :InventoryAlertServiceService ,
    private inventoryService:InventoryService,
    private authService: AuthServiceService,
    private router: Router
  
  ) {}


ngOnInit(): void {
  this.loadRole();
    this.getAllAlerts();
    this.getAllInventories();




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

  getAllAlerts(): void {
    this.inventoryAlertService.getAllAlerts().subscribe({
      next: (data) => this.alerts = data,
      error: (err) => console.error('Failed to fetch alerts:', err)
    });
  }

  getAllInventories(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => this.inventories = data,
      error: (err) => console.error('Failed to fetch inventories:', err)
    });
  }

  addAlert(): void {
    this.inventoryAlertService.createAlert(this.newAlert as InventoryAlert).subscribe({
      next: (data) => {
        this.alerts.push(data);
        console.log('Alert added successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Failed to add alert:', err)
    });
  }

  editAlert(alert: InventoryAlert): void {
    this.editAlertData = {
      id: alert.id,
      alertType: alert.alertType,
      message: alert.message,
      resolved: alert.resolved,
      createdAt: alert.createdAt,
      inventory: { id: alert.inventory.id }
    };
  }


  deleteAlert(id: number): void {
  if (confirm('Are you sure you want to delete this alert?')) {
    this.inventoryAlertService.deleteAlert(id).subscribe({
      next: () => {
        this.alerts = this.alerts.filter(alert => alert.id !== id); // Remove alert from list
        console.log('Alert deleted successfully.');
      },
      error: (err) => console.error('Failed to delete alert:', err)
    });
  }
}


  resolveAlert(): void {
    if (this.editAlertData && this.editAlertData.id) {
      this.editAlertData.resolved = true; // Mark as resolved
      console.log(this.editAlertData);
      this.inventoryAlertService.resolveAlert(this.editAlertData.id,this.editAlertData as InventoryAlert).subscribe({
        next: () => {
          const index = this.alerts.findIndex(a => a.id === this.editAlertData.id);
          if (index !== -1) {
            this.alerts[index].resolved = true;
          }

          const modalElement = document.getElementById('editModal5');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }

          this.getAllAlerts(); // Refresh the list of alerts
          console.log('Alert marked as resolved!');
        },
        error: (err) => console.error('Failed to resolve alert:', err)
      });
    }
  }

  resetForm(): void {
    this.newAlert = {
      alertType: '',
      message: '',
      resolved: false,
      inventory: { id: 0 },
      createdAt: new Date()
    };
    this.editAlertData = {
      alertType: '',
      message: '',
      resolved: false,
      inventory: { id: 0 },
      createdAt: new Date()
    };
    //this.isEditing = false;
    //this.editId = null;
  }









}