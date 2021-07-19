import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutHeaderComponent } from './app.layout-header.component';

@NgModule({
  declarations: [
    AppLayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AppLayoutHeaderComponent
  ]
})

export class AppLayoutHeaderModule { }
