import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as UserSelectors from '../story/selectors/user.selectors';
import { logout } from '../story/actions/user.actions';

interface User {
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentRoute: string = '';
  user: User | null = null;

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(UserSelectors.selectCurrentUser);
    this.loading$ = this.store.select(UserSelectors.selectAuthLoading);
    this.error$ = this.store.select(UserSelectors.selectAuthError);

    // Subscribe to router events to track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit(): void {
    // Subscribe to user changes from the store
    this.user$.subscribe(user => {
      this.user = user;
      
      // If no user in store but we have one in localStorage, try to use that
      if (!user) {
        const storedUser = localStorage.getItem('BestUser');
        if (storedUser) {
          try {
            this.user = JSON.parse(storedUser);
          } catch (e) {
            console.error('Error parsing stored user:', e);
          }
        }
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  logout(): void {
    localStorage.removeItem('BestUser');
    localStorage.removeItem('BestToken');
    localStorage.removeItem('BestRole');
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }
}
