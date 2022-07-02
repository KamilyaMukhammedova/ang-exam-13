import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError, RegisterUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') userForm!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | RegisterError>;
  errorSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.registerLoading);
    this.error = store.select(state => state.users.registerError);
  }

  ngAfterViewInit(): void {
    this.errorSubscription = this.error.subscribe(error => {
      if (error) {
        const message = error.errors.email.message;
        this.userForm.form.get('email')?.setErrors({serverError: message});
      } else {
        this.userForm.form.get('email')?.setErrors({});
      }
    });
  }

  onRegister() {
    const userData: RegisterUserData = this.userForm.value;
    this.store.dispatch(registerUserRequest({userData}));
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
