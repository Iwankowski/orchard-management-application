// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  userRole: string = '';

  login(username: string, role: string) {
    this.isLoggedIn = true;
    this.userRole = role;
  }

  logout() {
    this.isLoggedIn = false;
    this.userRole = '';
    localStorage.removeItem('plantations');
  }
}

