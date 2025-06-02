import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CylinderType } from '../model/cylinder-type/cylinder-type.model';

@Injectable({
  providedIn: 'root'
})
export class CylinderTypeService {

  private apiUrl = 'http://localhost:8080/api/cylinder-type'; // Spring Boot endpoint for cylinder types

  constructor(private http:HttpClient) { }

   //  GET all cylinder types
  getAllCylinderTypes(): Observable<CylinderType[]> {
    return this.http.get<CylinderType[]>(this.apiUrl);
  }

  //  GET cylinder type by ID
  getCylinderTypeById(id: number): Observable<CylinderType> {
    return this.http.get<CylinderType>(`${this.apiUrl}/${id}`);
  }

  //  POST create new cylinder type
  createCylinderType(cylinderType: CylinderType): Observable<CylinderType> {
    return this.http.post<CylinderType>(this.apiUrl, cylinderType);
  }

  //  PUT update existing cylinder type
  updateCylinderType(id: number, cylinderType: CylinderType): Observable<CylinderType> {
    return this.http.put<CylinderType>(`${this.apiUrl}/${id}`, cylinderType);
  }

  //  DELETE cylinder type by ID
  deleteCylinderType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
