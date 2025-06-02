import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../../model/work-order/work-order.model';
import { WorkOrderServiceService } from '../../service/work-order-service.service';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../service/user-service.service';
import { User } from '../../model/user/user.model';
import { Cylinder } from '../../model/cylinder/cylinder.model';
import { CylinderService } from '../../service/cylinder.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-work-order',
  imports: [FormsModule,CommonModule],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.css'
})
export class WorkOrderComponent implements OnInit {
  userRole: string | null = ''
  workOrders: WorkOrder[] = [];
  technicians: User[] = [];
  cylinders: Cylinder[] = [];

  newWorkOrder: WorkOrder = {
    maintenanceType: '',
    priority: '',
    status: '',
    scheduledDate: '',
    cylinder: { cylinderId: 0 }, // Match your backend structure
    assignedTechnician: { id: 0 ,username:''} // Match your backend structure
  };

  selectedOrder: WorkOrder | null = null;

  constructor(
    private workOrderService: WorkOrderServiceService,
    private userService: UserServiceService,
    private cylinderService: CylinderService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRole();
    this.loadWorkOrders();
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
  //console.log('User role refreshed:', this.userRole);
}

  // Load all work orders
  loadWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe({
      next: (data) => {
        this.workOrders = data;
        //console.log('Fetched work orders:', data);
      },
      error: (err) => {
        console.error('Error fetching work orders:', err);
      }
    });
  }

  // Load all technicians (users)
  loadTechnicians(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
         //console.log('Fetched technicians:', data); // Log to see the data structure
        this.technicians = data;
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
      },
      error: (err) => {
        console.error('Error fetching cylinders:', err);
      }
    });
  }

  // Add a new work order
  addWorkOrder(): void {
    this.workOrderService.addWorkOrder(this.newWorkOrder).subscribe({
      next: (order) => {
        this.workOrders.push(order);
        this.resetNewWorkOrder();
      },
      error: (err) => {
        console.error('Error adding work order:', err);
      }
    });
  }

  // Edit existing order
  editOrder(order: WorkOrder): void {
    // Deep copy to avoid 2-way binding issues
    this.selectedOrder = JSON.parse(JSON.stringify(order));
  }

  // Save edited order
saveSelectedOrder(): void {
  if (this.selectedOrder?.id) {
    this.workOrderService.updateWorkOrder(this.selectedOrder.id, this.selectedOrder).subscribe({
      next: () => {
        this.loadWorkOrders();
        this.selectedOrder = null;

        // Close edit modal
        const modalElement = document.getElementById('editModal4');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement) ;
          modalInstance?.hide();
        }
      },
      error: (err) => {
        console.error('Error updating work order:', err);
      }
    });
  }
}

  // Cancel editing
  cancelEdit(): void {
    this.selectedOrder = null;
  }

  // Delete order
  deleteOrder(id: number): void {
    this.workOrderService.deleteWorkOrder(id).subscribe({
      next: () => {
        this.workOrders = this.workOrders.filter(order => order.id !== id);
      },
      error: (err) => {
        console.error('Error deleting work order:', err);
      }
    });
  }

  // Reset new work order object
  resetNewWorkOrder(): void {
    this.newWorkOrder = {
      maintenanceType: '',
      priority: '',
      status: '',
      scheduledDate: '',
      cylinder: { cylinderId: 0 },
      assignedTechnician: { id: 0 ,username:''}
    };
  }
}
