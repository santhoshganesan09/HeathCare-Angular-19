import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefectReport } from '../model/defect-report/defect-report.model';

@Injectable({
  providedIn: 'root'
})
export class DefectReportService {
  private apiUrl = 'http://localhost:8080/api/defects'; // Spring Boot endpoint for defect reports

  constructor(private http:HttpClient) { }

  // Get all defect reports
  getAllDefects(): Observable<DefectReport[]> {
    return this.http.get<DefectReport[]>(this.apiUrl);
  }

  // Add a new defect report
  createDefect(defectReport: DefectReport): Observable<DefectReport> {
    return this.http.post<DefectReport>(this.apiUrl, defectReport);
  }

  // Delete a defect report by ID
  deleteDefect(defectReportId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${defectReportId}`);
  }
 // Update an existing defect report
 updateDefect(id: number, defectReport: DefectReport): Observable<DefectReport> {
  return this.http.put<DefectReport>(`${this.apiUrl}/${id}`, defectReport);
}

}
