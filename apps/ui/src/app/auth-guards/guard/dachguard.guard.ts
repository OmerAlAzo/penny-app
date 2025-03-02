import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem('BestRole');
    const token = localStorage.getItem('BestToken');

    if (token && role === 'customer') {
      return true;
    }

    return false;
  }
}
