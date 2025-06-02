import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080/api/auth';  // Adjust URL to your API endpoint

  constructor(private http: HttpClient,private router:Router) { }


  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, payload);
  }

  register(username: string, password: string): Observable<any> {
  const payload = { username, password };
  return this.http.post<any>(`${this.apiUrl}/register`, payload);
}


getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users`);
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/users/${id}`);
}




  saveToken(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

// only admin for Cylinder list
/*getUserRole(): string {
  return localStorage.getItem('userRole') || '';
}*/

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  redirectToDashboard(): void {
    const role = this.getRole();
    if (role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'STAFF') {
      this.router.navigate(['/staff-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
