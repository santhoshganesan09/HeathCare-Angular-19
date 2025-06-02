import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

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
