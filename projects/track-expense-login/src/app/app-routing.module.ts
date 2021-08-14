import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppContentModule } from "../../../../src/app/app.module";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./login/app.login.module").then((m) => m.AppLoginModule)
  },
  {
    path: "register",
    loadChildren: () => import("./register/app.register.module").then((m) => m.AppRegisterModule)
  },
  {
    path: "forgot-password",
    loadChildren: () => import("./forgot-password/app.forgot-password.module").then((m) => m.AppForgotPasswordModule)
  },
  {
    path: "email-verified",
    loadChildren: () => import("./email-verified/app.email-verified.module").then((m) => m.AppEmailVerifiedModule)
  },
  {
    path: "reset-password",
    loadChildren: () => import("./reset-password/app.reset-password.module").then((m) => m.AppResetPasswordModule)
  },
  {
    path: "content",
    loadChildren: () => import("../../../../src/app/app.module").then((m) => m.AppContentModule),
    canActivate: [AuthGuard]
  },
  //{
  //  path: '**',
  //  redirectTo: 'login'
  //}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AppContentModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
