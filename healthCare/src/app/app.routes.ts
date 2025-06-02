import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { StaffDashbordComponent } from './components/staff-dashbord/staff-dashbord.component';
import { LoginComponent } from './components/login/login.component';
import { CylinderTypeComponent } from './components/cylinder-type/cylinder-type.component';
import { InvventoryAlertComponent } from './components/invventory-alert/invventory-alert.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MaintenanceScheduleComponent } from './components/maintenance-schedule/maintenance-schedule.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashbordComponent },
  { path: 'staff-dashboard', component: StaffDashbordComponent },
 { path: 'cylinderType', component: CylinderTypeComponent },
 { path: 'inventory-alert', component: InvventoryAlertComponent },
 { path: 'inventory', component: InventoryComponent },
 { path: 'maintenance-workorder', component: MaintenanceScheduleComponent },
 { path: 'register-page', component: RegisterPageComponent },
 { path: 'stafflist', component: StaffListComponent },

  

];
