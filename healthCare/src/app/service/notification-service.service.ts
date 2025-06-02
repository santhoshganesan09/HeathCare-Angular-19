import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdminNotification } from '../model/admin-notification/admin-notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
    private baseUrl = 'http://localhost:8080/api/notification';
  constructor(private http:HttpClient) {}

 // Get notifications for a specific role (admin or staff)
  getNotificationsByRole(role: string): Observable<AdminNotification[]> {
    return this.http.get<AdminNotification[]>(`${this.baseUrl}/${role}`).pipe(
      map((data: AdminNotification[]) => {
        return data.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
      })
    );
  }

  // Get all notifications (optional)
getAllNotifications(): Observable<AdminNotification[]> {
    return this.http.get<AdminNotification[]>(`${this.baseUrl}`);
  }

markAllAsReadByRole(role: string): Observable<AdminNotification[]> {
  return this.http.put<AdminNotification[]>(`${this.baseUrl}/mark-all-read/${role}`, {});
}



}
