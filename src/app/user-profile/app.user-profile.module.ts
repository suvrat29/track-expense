import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppUserProfileComponent } from "./app.user-profile.component";
import { AppUserProfileService } from "./app.user-profile.service";

const routes: Routes = [
  {
    path: "",
    component: AppUserProfileComponent
  }
];

@NgModule({
  declarations: [
    AppUserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppUserProfileService
  ]
})

export class AppUserProfileModule { }
