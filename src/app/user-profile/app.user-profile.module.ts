import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserProfileComponent } from './app.user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppUserProfileComponent
  }
];

@NgModule({
  declarations: [
    AppUserProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AppUserProfileModule { }
