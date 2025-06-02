import { Component, OnInit } from '@angular/core';
import { CylinderService } from '../../service/cylinder.service';
import { DefectReportService } from '../../service/defect-report.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalCylinders = 0;
  totalDefects = 0;

  constructor(
    private cylinderService: CylinderService,
    private defectService: DefectReportService
  ) {}

  ngOnInit(): void {
    this.cylinderService.getAllCylinders().subscribe(data => {
      this.totalCylinders = data.length;
    });

    this.defectService.getAllDefects().subscribe(data => {
      this.totalDefects = data.length;
    });
  }


}





  
