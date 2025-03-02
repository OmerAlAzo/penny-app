import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/user.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => {
    if (!state.user) {
      const storedUser = localStorage.getItem('BestUser');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error('Error parsing stored user:', e);
          return null;
        }
      }
      return null;
    }
    return state.user;
  }
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthCheck = createSelector(
  selectAuthState,
  (state: AuthState) => state.checkingAuth
);
