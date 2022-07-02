import { createAction, props } from '@ngrx/store';
import {
  FacebookUserData,
  LoginError,
  LoginUserData,
  RegisterError,
  RegisterUserData,
  User
} from '../../models/user.model';

export const registerUserRequest = createAction(
  '[User] Register Request',
  props<{ userData: RegisterUserData }>()
);
export const registerUserSuccess = createAction(
  '[User] Register Success',
  props<{ user: User }>()
);
export const registerUserFailure = createAction(
  '[User] Register Failure',
  props<{ error: null | RegisterError }>()
);
export const loginUserRequest = createAction(
  '[User] Login Request',
  props<{ userData: LoginUserData }>()
);
export const loginUserSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);
export const loginUserFailure = createAction(
  '[User] Login Failure',
  props<{ error: null | LoginError }>()
);
export const logoutUser = createAction('[User] Logout');
export const logoutUserRequest = createAction('[User] Server Logout Request');
export const facebookUserRequest = createAction(
  '[User] Facebook Request',
  props<{ userData: FacebookUserData }>()
);
export const facebookUserSuccess = createAction(
  '[User] Facebook Success',
  props<{ user: User }>()
);
export const facebookUserFailure = createAction(
  '[User] Facebook Failure',
  props<{ error: string }>()
);
