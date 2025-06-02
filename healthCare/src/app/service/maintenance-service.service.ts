import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceSchedule } from '../model/maintenance-schedule/maintenance-schedule.model';
import { WorkOrder } from '../model/work-order/work-order.model';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceServiceService {
  private baseUrl = 'http://localhost:8080/api/maintenance'; // Adjust the URL as per your backend API

  constructor(private http: HttpClient) {}


  getAllSchedules(): Observable<MaintenanceSchedule[]> {
    return this.http.get<MaintenanceSchedule[]>(`${this.baseUrl}/schedule`);
  }

  getSchedulesByCylinder(cylinderId: number): Observable<MaintenanceSchedule[]> {
    return this.http.get<MaintenanceSchedule[]>(`${this.baseUrl}/schedules/${cylinderId}`);
  }

  addSchedule(schedule: MaintenanceSchedule): Observable<MaintenanceSchedule> {
    return this.http.post<MaintenanceSchedule>(`${this.baseUrl}/schedule`, schedule);
  }

  updateSchedule(id: number, schedule: MaintenanceSchedule): Observable<MaintenanceSchedule> {
    return this.http.put<MaintenanceSchedule>(`${this.baseUrl}/schedule/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schedule/${id}`);
  }

}
