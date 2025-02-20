import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { User } from "../models/user.model";
import {
  signupUserFailure,
  signupUserSuccess,
  signupUser,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  forgotPassSuccess,
  forgotPassFailure,
  forgotPass,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../actions/user.actions";

@Injectable()
export class AuthEffects {
  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUser),
      mergeMap((action) =>
        this.http
          .post<User>("http://localhost:5040/auth/signup", action.user, {
            withCredentials: true,
          })
          .pipe(
            map((user: User) => {
              localStorage.setItem("BestUser", JSON.stringify(user));
              return signupUserSuccess({ user });
            }),
            catchError((error) => {
              const errorMsg = error?.error?.message || "An error occured";
              return of(signupUserFailure({ error: errorMsg }));
            })
          )
      )
    )
  );
    
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) =>
        this.http
          .post<User>("http://localhost:5040/auth/login", action.user, {
            withCredentials: true,
          })
          .pipe(
            map((response: any) => {
              const user = response.user;
              localStorage.setItem('BestUser', JSON.stringify(user));
              localStorage.setItem('BestToken', response.token);
              localStorage.setItem('BestRole', user.role);
              return loginUserSuccess({ user });
            }),
            catchError((error) => {
              const errorMessage = error?.error?.message || "An error occured";
              return of(loginUserFailure({ error: errorMessage }));
            })
          )
      )
    )
  );

  forgotPass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forgotPass),
      mergeMap((action) =>
        this.http
          .post<{ message: string }>(
            "http://localhost:5040/auth/forgot-password",
            { email: action.email }
          )
          .pipe(
            map((response) => forgotPassSuccess({ message: response.message })),
            catchError((error) =>
              of(forgotPassFailure({ error: error.message }))
            )
          )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      mergeMap((action) =>
        this.http
          .post<{ message: string }>(
            `http://localhost:5040/auth/reset-password/${action.token}`,
            // { params: { token: action.token } }
            { password: action.password }
          )
          .pipe(
            map((response) =>
              resetPasswordSuccess({ message: response.message })
            ),
            catchError((error) =>
              of(resetPasswordFailure({ error: error.message }))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
