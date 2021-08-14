import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ModalModule } from "../common/modal-component/modal.module";
import { AppSetupComponent } from "./app.setup.component";
import { AppSetupService } from "./app.setup.service";
import { SetupCategoryComponent } from "./category-tab/setup.category-tab.component";
import { SetupSubCategoryComponent } from "./subcategory-tab/setup.subcategory-tab.component";

const routes: Routes = [
  {
    path: "",
    component: AppSetupComponent
  }
];

@NgModule({
  declarations: [
    AppSetupComponent,
    SetupCategoryComponent,
    SetupSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [
    AppSetupService
  ]
})

export class AppSetupModule { }
