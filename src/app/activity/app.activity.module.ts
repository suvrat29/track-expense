import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppActivityComponent } from './app.activity.component';

const routes: Routes = [
  {
    path: '',
    component: AppActivityComponent
  }
];

@NgModule({
  declarations: [
    AppActivityComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AppActivityModule { }
