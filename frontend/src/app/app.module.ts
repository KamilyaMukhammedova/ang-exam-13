import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AppStoreModule } from './store/app-store.module';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ImagePipe } from './pipes/image.pipe';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { ValidateIdenticalDirective } from './validate-indentical.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlaceInfoComponent } from './pages/place-info/place-info.component';
import { StarsComponent } from './ui/stars/stars.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppID, {
        scope: 'email,public_profile'
      })
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    ImagePipe,
    FileInputComponent,
    CenteredCardComponent,
    RegisterComponent,
    ValidateIdenticalDirective,
    LoginComponent,
    PlacesComponent,
    AddPlaceComponent,
    PlaceInfoComponent,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppStoreModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
  ],
  providers: [
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
