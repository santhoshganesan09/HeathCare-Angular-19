import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CylinderService } from './service/cylinder.service';
import { DefectReport } from './model/defect-report/defect-report.model';
import { Cylinder } from './model/cylinder/cylinder.model';
import { DefectReportService } from './service/defect-report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CylinderListComponent } from "./components/cylinder-list/cylinder-list.component";
import { DefectReportComponent } from "./components/defect-report/defect-report.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
//import { Nav2Component } from "./components/staff-defectReports/nav2.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, DashboardComponent, CylinderListComponent, DefectReportComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'healthCare';
  sidebarOpen: boolean = true;

  closeSidebarOnOutsideClick() {
    if (window.innerWidth < 992) { // lg and below
      this.sidebarOpen = false;
    }
  }

}


