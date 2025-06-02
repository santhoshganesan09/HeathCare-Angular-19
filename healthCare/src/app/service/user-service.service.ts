import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8080/api/auth/users';  // Backend URL for user APIs

  constructor(private http: HttpClient) { }

  // Method to fetch all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Method to fetch a user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}
