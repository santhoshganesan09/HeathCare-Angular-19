import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../model/inventory/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseurl = 'http://localhost:8080/api/inventory';
  constructor(private http:HttpClient) { }

  getAll():Observable<Inventory[]>{
    return this.http.get<Inventory[]>(this.baseurl);
  }

  getById(id:number):Observable<Inventory>{
    return this.http.get<Inventory>(`${this.baseurl}/${id}`);
  }

  addInventory(inventory:Inventory):Observable<Inventory>{
    return this.http.post<Inventory>(this.baseurl, inventory);
  }
  updateInventory(id:number, inventory:Inventory):Observable<Inventory>{
    return this.http.put<Inventory>(`${this.baseurl}/${id}`, inventory);
  }
  deleteInventory(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseurl}/${id}`);
  }



}
