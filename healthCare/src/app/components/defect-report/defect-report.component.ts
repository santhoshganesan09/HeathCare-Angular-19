import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DefectReportService } from '../../service/defect-report.service';
import { DefectReport } from '../../model/defect-report/defect-report.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-defect-report',
  imports: [CommonModule,FormsModule],
  templateUrl: './defect-report.component.html',
  styleUrl: './defect-report.component.css'
})
export class DefectReportComponent implements OnInit {
  defects: DefectReport[] = [];
  userRole: string | null = '';
  newDefect: DefectReport = {
    defectType: '',
    description: '',
    createdAt: '',
    cylinder: {
      cylinderId: 0
    }
  };

  selectedDefect: DefectReport | null = null;

  constructor(private defectReportService: DefectReportService,
    private cdr:ChangeDetectorRef,private authService: AuthServiceService,private router: Router) {}

  ngOnInit(): void {
    this.loadRole();
    this.loadDefects();
    
    // Listen for route changes and update role dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadRole();
      });
 
  }


  loadRole(): void {
  this.userRole = this.authService.getRole();
  console.log('User role refreshed:', this.userRole);
}


  loadDefects(): void {
    this.defectReportService.getAllDefects().subscribe(data => {
      this.defects = data;
    });
  }

  addDefect(): void {
    this.defectReportService.createDefect(this.newDefect).subscribe(defect => {
      this.defects.push(defect);
      this.newDefect = {
        defectType: '',
        description: '',
        createdAt: '',
        cylinder: {
          cylinderId: 0
        }
      };
    });
  }

  deleteDefect(id: number): void {
    this.defectReportService.deleteDefect(id).subscribe({
      next: () => {
        this.defects = this.defects.filter(defect => defect.id !== id);
      },
      error: err => {
        console.error('Failed to delete defect:', err);
      }
    });
  }

  editDefect(defect: DefectReport): void {
    this.selectedDefect = JSON.parse(JSON.stringify(defect)); // deep copy to prevent auto-changes
   
  }
  

saveChanges(): void {
  if (this.selectedDefect && this.selectedDefect.id) {
    this.defectReportService.updateDefect(this.selectedDefect.id, this.selectedDefect).subscribe({
      next: (updated) => {
        // Update the defect in the list
        const index = this.defects.findIndex(d => d.id === updated.id);
        if (index !== -1) {
          this.defects[index] = updated;
        }

        // Show success toast message
        this.showToast('Defect report updated successfully!', 'success');

        // Close the modal
        const modalElement = document.getElementById('exampleModal1');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide(); 
          
          location.reload(); // Reload the page to reflect changes// Close the modal after saving
        }

        // Reset the selected defect
        this.selectedDefect = null;
      },
      error: err => {
        console.error('Update failed', err);
        this.showToast('Failed to update defect report!', 'danger');
      }
    });
  } else {
    console.error('Selected defect is invalid or missing an ID.');
  }
}

showToast(message: string, type: string): void {
  const toastContainer = document.querySelector('.toast-container');

  // Create a new toast element
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast', 'fade', `bg-${type}`, 'text-white');
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
  toastElement.setAttribute('aria-atomic', 'true');

  toastElement.innerHTML = `
    <div class="toast-header">
      <strong class="me-auto">${type === 'success' ? 'Success' : 'Error'}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;

  // Append the toast to the container
  toastContainer?.appendChild(toastElement);

  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  // Remove toast after it disappears (optional)
  setTimeout(() => {
    toastElement.remove();
  }, 5000);  // Remove after 5 seconds
}





}

 






  

