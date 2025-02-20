import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Router } from '@angular/router';
import * as UserSlectore from "../../../story/selectors/user.selectors";
import * as AuthActions from "../../../story/actions/user.actions";
import { User } from '../../../story/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  role = '';
  isPasswordVisible = false;
  isEmailWeak = false;
  isPasswordWeak = false;

  user$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;


  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(UserSlectore.selectCurrentUser);
    this.loading$ = this.store.select(UserSlectore.selectAuthLoading);
    this.error$ = this.store.select(UserSlectore.selectAuthError);
  }

  ngOnInit() {
    // Clear any previous errors
    this.store.dispatch(AuthActions.signupUserFailure({ error: null }));
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  }

  onSignup() {
    // Validate email and password
    this.isEmailWeak = !this.validateEmail(this.email);
    this.isPasswordWeak = !this.validatePassword(this.password);

    if (this.isEmailWeak || this.isPasswordWeak) {
      return;
    }

    const newUser: User = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      role: this.role
    };

    // Dispatch signup action
    this.store.dispatch(AuthActions.signupUser({ user: newUser }));


    // Handle navigation after successful signup
    this.user$.pipe(
      filter(data => !!data?.user), // Only proceed when user exists
      take(1) // Take only the first emission and then unsubscribe
    ).subscribe(data => {
      localStorage.setItem('BestRole', data.user.role);
      localStorage.setItem('BestToken', data.token);
      localStorage.setItem('BestUser', JSON.stringify(data.user));

      if (data.user.role === "admin") {
        this.router.navigate(['/admin']);
      } else if (data.user.role === "customer") {
        this.router.navigate(['/dach']);
      }
    });
  }





}
