import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from "../login-page/login-page.component";
import { RegisterPageComponent } from "../register-page/register-page.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthServiceService, private router:Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token, res.role);
        this.authService.redirectToDashboard();
      },
      error: () => {
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }


SignInOptions = [
    {
      image: 'assets/templates/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/templates/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/templates/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];


}
