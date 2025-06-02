import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cylinder } from '../model/cylinder/cylinder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CylinderService {
  private apiUrl = 'http://localhost:8080/api/cylinders'; // Spring Boot endpoint for cylinders

    constructor(private http:HttpClient) { }

    // Get all cylinders
    getAllCylinders(): Observable<Cylinder[]> {
      return this.http.get<Cylinder[]>(this.apiUrl);
    }

     // Update an existing cylinder
  updateCylinder(cylinder: Cylinder): Observable<Cylinder> {
    return this.http.put<Cylinder>(`${this.apiUrl}/${cylinder.cylinderId}`, cylinder);
  }
  
    // Add a new cylinder
    createCylinder(cylinder: Partial<Cylinder>): Observable<Cylinder> {
      return this.http.post<Cylinder>(this.apiUrl, cylinder,{
      
        
      });
    }
  
    // Delete a cylinder by ID
    deleteCylinder(cylinderId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${cylinderId}`);
    }



  }



