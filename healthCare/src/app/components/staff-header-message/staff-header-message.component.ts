import { Component, OnInit } from '@angular/core';
import { AdminNotification } from '../../model/admin-notification/admin-notification.model';
import { NotificationServiceService } from '../../service/notification-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-header-message',
  imports: [FormsModule,CommonModule],
  templateUrl: './staff-header-message.component.html',
  styleUrl: './staff-header-message.component.css'
})
export class StaffHeaderMessageComponent implements OnInit {
  
  
  notifications: AdminNotification[] = [];
    constructor(private notificationService: NotificationServiceService) {}

  
  ngOnInit(): void {
 
     this.notificationService.getNotificationsByRole('staff').subscribe((formatted: AdminNotification[]) => {
      this.notifications = formatted;
    });
  }

}
