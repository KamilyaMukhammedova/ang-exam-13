import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { RoleGuardService } from './services/role-guard.service';
import { PlaceInfoComponent } from './pages/place-info/place-info.component';

const routes: Routes = [
  {path: '', component: PlacesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'add-new-place',
    component: AddPlaceComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['Admin', 'User']}
  },
  {path: 'place/:id', component: PlaceInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
