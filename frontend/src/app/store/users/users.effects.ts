import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {
  facebookUserFailure,
  facebookUserRequest,
  facebookUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { catchError, map, mergeMap, NEVER, of, tap, withLatestFrom } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerNewUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register is successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login is successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.usersService.logout(user.token).pipe(
          map(() => logoutUser()),
          tap(async () => {
            await this.auth.signOut();
            await this.router.navigate(['/']);
            this.helpers.openSnackbar('Logout is successful');
          })
        );
      }
      return NEVER;
    })
  ));

  facebookLogin = createEffect(() => this.actions.pipe(
    ofType(facebookUserRequest),
    mergeMap(({userData}) => this.usersService.facebookLogin(userData).pipe(
      map(user => facebookUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login by facebook is successful !');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(facebookUserFailure({
        error: 'Something went wrong! Can\'t login by facebook!'
      })))
    ))
  ));
}
