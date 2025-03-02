

import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { User, Userlogin } from '../models/user.model';
import { loginUser, loginUserFailure, loginUserSuccess,
         signupUser,
         signupUserFailure, signupUserSuccess,
         logout
        } from '../actions/user.actions';

export interface AuthState {
  user: User | Userlogin | null;
  error: any;
  loading: boolean;
  checkingAuth: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  checkingAuth: true,
};

const _authReducer = createReducer( initialState ,

  on(signupUser, (state, { user }) => ({
    ...state,
    loading : true
  })),

  on(signupUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loading : false ,
    checkingAuth: false,

  })),

  on(signupUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading : false

  })),
///


  on(loginUser, (state, { user }) => ({
    ...state,
    loading : true

  })),

  on(loginUserSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      error: null,
      loading: false,
      checkingAuth: false
    };
  }),

  on(loginUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading : false
  })),

  on(logout, (state) => ({
    ...initialState,
    checkingAuth: false
  }))

);



export function authReducer(state: AuthState = initialState, action: Action): AuthState {
  return _authReducer(state, action);
}
