import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app.layout.component';
import { AppLayoutHeaderModule } from './layout-header/app.layout-header.module';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    AppLayoutHeaderModule,
    RouterModule
  ],
  exports: [
    AppLayoutComponent
  ]
})

export class AppLayoutModule { }
