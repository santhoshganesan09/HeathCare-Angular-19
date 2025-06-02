import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkOrder } from '../model/work-order/work-order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderServiceService {
   private apiUrl = 'http://localhost:8080/api/maintenance';
  constructor(private http:HttpClient) { }


// Get all work orders
getAllWorkOrders(): Observable<WorkOrder[]> {
  return this.http.get<WorkOrder[]>(`${this.apiUrl}/workorders`);
}

 // Get work orders by cylinder ID
  getWorkOrdersByCylinder(id: number): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(`${this.apiUrl}/workorders/${id}`);
  }

  // Add work order
  addWorkOrder(order: WorkOrder): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(`${this.apiUrl}/workorder`, order);
  }

  // Update work order
  updateWorkOrder(id: number, order: WorkOrder): Observable<WorkOrder> {
    return this.http.put<WorkOrder>(`${this.apiUrl}/workorder/${id}`, order);
  }

  // Delete work order
  deleteWorkOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workorder/${id}`);
  }


}
