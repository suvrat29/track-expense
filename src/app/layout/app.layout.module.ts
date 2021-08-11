import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppLayoutComponent } from "./app.layout.component";
import { AppLayoutHeaderModule } from "./layout-header/app.layout-header.module";
import { AppUpdateBannerModule } from "./layout-update-banner/app.update-banner.module";

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    AppLayoutHeaderModule,
    AppUpdateBannerModule,
    RouterModule
  ],
  exports: [
    AppLayoutComponent
  ]
})

export class AppLayoutModule { }
