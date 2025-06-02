import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminHeaderMessageComponent } from "../admin-header-message/admin-header-message.component";
import { CylinderTypeComponent } from "../cylinder-type/cylinder-type.component";

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, AdminHeaderMessageComponent, CylinderTypeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

}
