import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryAlert } from '../model/inventory-alert/inventory-alert.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryAlertServiceService {
  getAll() {
    throw new Error('Method not implemented.');
  }

  private baseurl = 'http://localhost:8080/api/inventory/alerts';
  constructor(private http:HttpClient) { }

  createAlert(alert:InventoryAlert):Observable<InventoryAlert>{
    return this.http.post<InventoryAlert>(this.baseurl, alert);
  }

  getAllAlerts():Observable<InventoryAlert[]>{
    return this.http.get<InventoryAlert[]>(this.baseurl);
  }
  getAlertById(id:number):Observable<InventoryAlert>{
    return this.http.get<InventoryAlert>(`${this.baseurl}/${id}`);
  } 
  resolveAlert(id:number,alert:InventoryAlert):Observable<InventoryAlert>{
    return this.http.put<InventoryAlert>(`${this.baseurl}/${alert.id}`, alert);
  }

  deleteAlert(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseurl}/${id}`);
}

}
