// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, authservice: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.LoggedIn()) {
            // If not logged in, navigate to the login page
            this.router.navigate(['/login']);
            return false;
        }

        if (route.data && route.data['role']) {
            const requiredRole = route.data['role'];
            const userRole = localStorage.getItem('role');

            if (userRole !== requiredRole) {
                // If the user doesn't have the required role, navigate to a forbidden page
                this.router.navigate(['forbidden']);
                return false;
            }
        }

        // If the user is logged in and has the required role (if specified), allow access
        return true;
    }

    LoggedIn() {
        return (!!localStorage.getItem('access_token'))
    }
}
