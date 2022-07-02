import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FacebookUserData, LoginError, LoginUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { facebookUserRequest, loginUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  fbLoading: Observable<boolean>;
  fbError: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
    this.fbLoading = store.select(state => state.users.fbLoading);
    this.fbError = store.select(state => state.users.fbError);
  }

  ngOnInit(): void {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      console.log('FB login successful');

      const userData: FacebookUserData = {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.response.picture.data.url
      };

      this.store.dispatch(facebookUserRequest({userData}));
    });
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
  }
}
