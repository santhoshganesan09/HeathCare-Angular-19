import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationServiceService } from '../../service/notification-service.service';
import { map } from 'rxjs';
import { AdminNotification } from '../../model/admin-notification/admin-notification.model';



@Component({
  selector: 'app-admin-header-message',
  imports: [FormsModule,CommonModule,],
  templateUrl: './admin-header-message.component.html',
  styleUrl: './admin-header-message.component.css'
})
export class AdminHeaderMessageComponent implements OnInit {
  
notifications: AdminNotification[] = [];
  unreadCount: number = 0;
  showAll: boolean = false; // Toggle for showing all or limited notifications

  constructor(private notificationService: NotificationServiceService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationService.getNotificationsByRole('admin').subscribe((formatted: AdminNotification[]) => {
      this.notifications = formatted;
      this.updateUnreadCount();
    });
  }

  updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  resetViewState(): void {
  this.showAll = false;
}
  // Mark all notifications as read
  markAllAsRead(): void {
   this.notificationService.markAllAsReadByRole('admin').subscribe((updated: AdminNotification[]) => {
    this.notifications = updated;
    this.updateUnreadCount();
  });
  }

  toggleShowAll(event:Event): void {
     event.preventDefault(); // Stops link from navigating or closing dropdown
    this.showAll = !this.showAll;
  }
get visibleNotifications(): AdminNotification[] {
    return this.showAll ? this.notifications : this.notifications.slice(0, 3);
  }



}

