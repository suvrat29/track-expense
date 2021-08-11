import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppGuard } from "./app.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/app.home.module").then((m) => m.AppHomeModule),
    canActivate: [AppGuard]
  },
  {
    path: "activity",
    loadChildren: () => import("./activity/app.activity.module").then((m) => m.AppActivityModule),
    canActivate: [AppGuard]
  },
  {
    path: "user-profile",
    loadChildren: () => import("./user-profile/app.user-profile.module").then((m) => m.AppUserProfileModule),
    canActivate: [AppGuard]
  },
  {
    path: "app-setup",
    loadChildren: () => import("./setup/app.setup.module").then((m) => m.AppSetupModule),
    canActivate: [AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
