import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService : AuthService) {}

    users = [
      {username: 'u1', password: 'pass1', role: "Employee"},
      {username: 'm1', password: 'mpass1', role: 'Manager'},
    ];

    onSubmit() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Please enter both username and password.';
        return;
      }
  
      const user = this.users.find(u => u.username.toLowerCase() === this.username.toLowerCase() && u.password === this.password);
  
      if (user) {
        console.log('Login Successful');
        console.log('Username', this.username);
        console.log('Role:', user.role);
  
        this.authService.login(this.username, user.role);
  
        if (user.role === 'Employee') {
          this.router.navigate(['/employee']);
        } else if (user.role === 'Manager') {
          this.router.navigate(['/manager']);
        }
  
      } else {
        this.errorMessage = 'Invalid credentials. Try again.';
  }
}
}

