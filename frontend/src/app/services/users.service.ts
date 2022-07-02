import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookUserData, LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  registerNewUser(userData: RegisterUserData) {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });
    return this.http.post<User>(environment.apiUrl + '/users', formData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  logout(token: string) {
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }

  facebookLogin(userData: FacebookUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', userData);
  }
}
