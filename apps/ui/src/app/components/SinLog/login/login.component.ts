import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import * as UserSlectore from "../../../story/selectors/user.selectors";
import * as AuthActions from "../../../story/actions/user.actions";
import { Router } from '@angular/router';
import { Userlogin } from '../../../story/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  email = 'omeradmin@email.com';
  password = 'Test1234';
  isPasswordVisible = false;

  user$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(UserSlectore.selectCurrentUser);
    this.loading$ = this.store.select(UserSlectore.selectAuthLoading);
    this.error$ = this.store.select(UserSlectore.selectAuthError);
  }

  ngOnInit() {

    this.store.dispatch(AuthActions.loginUserFailure({ error: null }));
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLogin() {

    const newUser: Userlogin = {
      email: this.email.trim(),
      password: this.password
    };


    this.store.dispatch(AuthActions.loginUser({ user: newUser }));


    this.user$.pipe(
      filter(user => !!user),
      take(1)
    ).subscribe(user => {
      if (user.role === "admin") {
        this.router.navigate(['/admin/users']);
      } else if (user.role === "customer") {
        this.router.navigate(['/dach']);
      }
    });
  }
}
