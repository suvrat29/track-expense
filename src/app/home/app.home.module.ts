import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from '../common/modal-component/modal.module';
import { AppHomeComponent } from './app.home.component';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent
  }
];

@NgModule({
  declarations: [
    AppHomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ModalModule
  ]
})

export class AppHomeModule { }
