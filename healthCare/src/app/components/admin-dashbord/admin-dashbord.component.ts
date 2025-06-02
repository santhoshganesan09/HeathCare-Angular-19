import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CylinderListComponent } from "../cylinder-list/cylinder-list.component";
import { DefectReportComponent } from "../defect-report/defect-report.component";
//import { Nav2Component } from "../staff-defectReports/nav2.component";
import { TocheckComponent } from "../tocheck/tocheck.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { NotificationServiceService } from '../../service/notification-service.service';
import { AdminHeaderMessageComponent } from "../admin-header-message/admin-header-message.component";
import { MaintenanceScheduleComponent } from "../maintenance-schedule/maintenance-schedule.component";
import { WorkOrderComponent } from '../work-order/work-order.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { InvventoryAlertComponent } from "../invventory-alert/invventory-alert.component";
import { CylinderTypeComponent } from "../cylinder-type/cylinder-type.component";
import { StaffListComponent } from "../staff-list/staff-list.component";

@Component({
  selector: 'app-admin-dashbord',
  imports: [DashboardComponent, CylinderListComponent, DefectReportComponent, TocheckComponent,
    FooterComponent, AdminHeaderMessageComponent,
    MaintenanceScheduleComponent, WorkOrderComponent, InventoryComponent, InvventoryAlertComponent,
    CylinderTypeComponent, RouterLink, StaffListComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  title = 'healthCare';
//Nitifiacation
  sidebarOpen: boolean = true;

  closeSidebarOnOutsideClick() {
    if (window.innerWidth < 992) { // lg and below
      this.sidebarOpen = false;
    }
  }
  constructor(private authService: AuthServiceService,private notification: NotificationServiceService) {}

  logout() {
    this.authService.logout();
  }
}
