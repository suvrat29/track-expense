import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppActivityComponent } from "./app.activity.component";
import { AppActivityService } from "./app.activity.service";

const routes: Routes = [
  {
    path: "",
    component: AppActivityComponent
  }
];

@NgModule({
  declarations: [
    AppActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AppActivityService
  ]
})

export class AppActivityModule { }
