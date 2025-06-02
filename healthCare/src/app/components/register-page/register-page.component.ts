import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

 username = '';
  password = '';
  message = '';


constructor(private authService: AuthServiceService,private router: Router) { }
register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.message = response.message;
        alert("Registration successful!");
        this.router.navigate(['/']); // navigate to login
      },
      error: (err) => {
        this.message = err.error.message || "Registration failed";
        alert("Error: " + this.message);
      }
    });
  }


SignUpOptions = [
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
