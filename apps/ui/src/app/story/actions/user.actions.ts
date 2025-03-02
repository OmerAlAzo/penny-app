import { createAction, props } from '@ngrx/store';
import { User, Userlogin } from '../models/user.model';

export const signupUser = createAction('[Auth] Signup User', props<{ user: User }>());
export const signupUserSuccess = createAction(  '[Auth] Signup User Success', props<{ user: User }>()) ;
export const signupUserFailure = createAction('[Auth] Signup User Failure', props<{ error: any }>()) ;

export const loginUser = createAction('[Auth] Login User', props< {user: Userlogin }>());
export const loginUserSuccess = createAction('[Auth] Login User Success', props<{ user: Userlogin }>());
export const loginUserFailure = createAction('[Auth] Login User Failure', props<{ error: any }>());

export const forgotPass = createAction('[Auth] Forgot Password',props<{ email: string }>());
export const forgotPassSuccess = createAction('[Auth] Forgot Password Success',props<{ message: string }>());
export const forgotPassFailure = createAction('[Auth] Forgot Password Failure',props<{ error: string }>());

export const resetPassword = createAction('[Auth] Reset Password',props<{ token: string; password: string }>());
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success',  props<{ message: string }>());
export const resetPasswordFailure = createAction('[Auth] Reset Password Failure',props<{ error: string }>());

export const logout = createAction('[Auth] Logout');






