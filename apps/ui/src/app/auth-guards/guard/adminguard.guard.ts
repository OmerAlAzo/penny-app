import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem('BestRole');
    const token = localStorage.getItem('BestToken');
    if (token && role === 'admin') {
      return true;
    }

    this.router.navigate(['/login']); // Redirect to login if not authorized
    return false;
  }
}
