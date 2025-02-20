import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem('BestRole');
    const token = localStorage.getItem('BestToken');

    // If user is already authenticated
    if (token && role) {
      if (role === 'admin') {
        this.router.navigate(['/admin']);
        return false;
      }
      this.router.navigate(['/dach']);
      return false;
    }

    // If not authenticated, allow access to auth pages
    return true;
  }
}
