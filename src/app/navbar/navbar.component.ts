import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navbarName: string = "Orchard Management Application"

  links: { text: string, url: string }[] = [
    { text: 'home', url: '/home' },
  ];

  employeeLinks: { text: string, url: string }[] = [
    { text: 'employee panel', url: '/employee' },
  ];

  managerLinks: { text: string, url: string }[] = [
    { text: 'manager panel', url: '/manager' },
  ];

  constructor(public authService: AuthService, private router : Router) {}

  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']); 
    this.clearLocalStorageData();
  }

  private clearLocalStorageData() {
    localStorage.removeItem('plantations');
  }

}

