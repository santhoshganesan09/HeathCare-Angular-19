import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent implements OnInit {
 staffList: any[] = [];
  errorMessage = '';

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.fetchStaff();
  }

  fetchStaff(): void {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.staffList = users.filter(user => user.role === 'ROLE_STAFF');
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch staff list';
        console.error(err);
      }
    });
  }

  deleteStaff(id: number): void {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          this.staffList = this.staffList.filter(user => user.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete staff';
          console.error(err);
        }
      });
    }
  }
}
