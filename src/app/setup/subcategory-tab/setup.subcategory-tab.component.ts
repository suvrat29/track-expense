import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { ModalService } from "../../common/modal-component/modal.service";
import { IAddNewSubcategory, ICategoryData, ISubcategoryData, IUpdateSubcategory } from "../app.setup.interface";
import { AppSetupService } from "../app.setup.service";

@Component({
  selector: "setup-subcategory",
  templateUrl: "./setup.subcategory-tab.component.html",
  styleUrls: ["./setup.subcategory-tab.component.scss"],
})

export class SetupSubCategoryComponent implements OnInit {
  categoryData: Array<ICategoryData> = [] as Array<ICategoryData>;
  subcategoryData: Array<ISubcategoryData> = [] as Array<ISubcategoryData>;
  _selectedCategoryData: ICategoryData = {} as ICategoryData;
  subcategoryForm: FormGroup;
  _pageLoad: boolean = true;
  _subcategoryLoad: boolean = false;
  _noData: boolean = true;
  _noSubcategoryData: boolean = true;
  _pageError: boolean = false;
  _subcategoryError: boolean = false;
  _categorySelected: boolean = false;
  enableActions: boolean = false;
  actionMenu: boolean = false;
  showModal: boolean = false;
  _editSubcategory: boolean = false;
  _formSubmit: boolean = false;
  showDeleteModal: boolean = false;
  _updateId: number = 0;
  _deleteId: number = 0;

  constructor(private modalService: ModalService, private setupService: AppSetupService, private toast: HotToastService) {
    this.subcategoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      icon: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.setupService.getAllCategories(false).subscribe((response: Array<ICategoryData>) => {
      this._pageLoad = false;
      if (response.length > 0) {
        this._noData = false;
        this.categoryData = this.setupService.processCategoryListData(response);
      } else {
        this._noData = true;
      }
    }, (error) => {
      this._pageLoad = false;
      this._noData = true;
      this._pageError = true;
    });
  }

  getSubcategoriesList(categoryName: string, categoryId: number) {
    this._selectedCategoryData = this.categoryData.find((x) => x.id === categoryId)!;
    this._subcategoryLoad = true;
    this.setupService.getAllSubcategoriesByCategory(categoryId).subscribe((response: Array<ISubcategoryData>) => {
      if (response.length > 0) {
        this.subcategoryData = this.setupService.processSubcategoryListData(response);
        this._noSubcategoryData = false;
      } else {
        this._noSubcategoryData = true;
      }

      this._subcategoryLoad = false;
      this._categorySelected = true;
    }, (error) => {
      this.toast.error("Failed to fetch subcategories for the selected category");
      this._subcategoryLoad = false;
      this._noSubcategoryData = true;
      this._subcategoryError = true;
      this._categorySelected = true;
    });
  }

  addSubcategory(categoryId: number) {
    this.openModal();
  }

  selectCategory() {
    this._categorySelected = false;
    this._selectedCategoryData = {} as ICategoryData;
  }

  openModal() {
    this.manageOpenAddForm();
    setTimeout(() => { this.modalService.open("setup-subcategory-modal"); }, 100);
  }

  manageOpenAddForm() {
    this.showModal = true;
    this.showDeleteModal = false;
    this._editSubcategory = false;
    this._formSubmit = false;
    this._updateId = 0;
    this._deleteId = 0;
  }

  openEditModal(id: number) {
    this.setFormData(id);
    this.managerOpenEditForm(id);
    setTimeout(() => { this.modalService.open("setup-subcategory-modal"); }, 100);
  }

  managerOpenEditForm(id: number) {
    this._editSubcategory = true;
    this.showModal = true;
    this.showDeleteModal = false;
    this._formSubmit = false;
    this._deleteId = 0;
    this._updateId = id;
  }

  setFormData(id: number) {
    let data: ISubcategoryData = this.subcategoryData.find((x) => x.id === id)!;

    this.subcategoryForm.controls["name"].setValue(data!.name);
    this.subcategoryForm.controls["icon"].setValue(data!.icon);
  }

  openDeleteModal(id: number) {
    this.manageOpenDeleteModal(id);
    setTimeout(() => { this.modalService.open("delete-subcategory-modal"); }, 100);
  }

  manageOpenDeleteModal(id: number) {
    this._editSubcategory = false;
    this.showModal = false;
    this.showDeleteModal = true;
    this._formSubmit = false;
    this._deleteId = id;
    this._updateId = 0;
  }

  processSubcategoryRequest(formData: FormGroup) {
    this._formSubmit = true;
    if (!this._editSubcategory) {
      if (formData.status === "VALID") {
        let postData: IAddNewSubcategory = this.mapNewSubcategoryData(formData);
        this.setupService.addNewSubcategory(postData).pipe(this.toast.observe({
          loading: "Adding new subcategory, please wait...",
          success: "Subcategory added successfully",
          error: "Failed to add subcategory"
        })).subscribe((response: boolean) => {
          if (response) {
            this.closeModal('setup-subcategory-modal');
            this.getSubcategoriesList(this._selectedCategoryData.name, this._selectedCategoryData.id);
          }
          else {
            this._formSubmit = false;
            this.toast.error("Failed to add subcategory");
          }
        }, (error) => {
          this._formSubmit = false;
        });
      } else {
        this.toast.error("Data entered in the form is invalid");
        this._formSubmit = false;
      }
    } else {
      if (formData.status === "VALID") {
        let postData: IUpdateSubcategory = this.mapUpdateSubcategoryData(formData);
        this.setupService.updateSubcategory(postData).pipe(this.toast.observe({
          loading: "Updating subcategory details, please wait...",
          success: "Subcategory updated successfully",
          error: "Failed to update subcategory"
        })).subscribe((response: boolean) => {
          if (response) {
            this.closeModal('setup-subcategory-modal');
            this.getSubcategoriesList(this._selectedCategoryData.name, this._selectedCategoryData.id);
          }
          else {
            this._formSubmit = false;
            this.toast.error("Failed to update subcategory");
          }
        }, (error) => {
          this._formSubmit = false;
        });
      } else {
        this.toast.error("Data entered in the form is invalid");
        this._formSubmit = false;
      }
    }
  }

  mapNewSubcategoryData(formData: FormGroup): IAddNewSubcategory {
    let data: IAddNewSubcategory = {} as IAddNewSubcategory;

    data.name = formData.controls["name"].value;
    data.categoryid = this._selectedCategoryData.id;
    data.icon = formData.controls["icon"].value != null && formData.controls["icon"].value != undefined ? formData.controls["icon"].value : "";

    return data;
  }

  mapUpdateSubcategoryData(formData: FormGroup): IUpdateSubcategory {
    let data: IUpdateSubcategory = {} as IUpdateSubcategory;

    data.id = this._updateId;
    data.name = formData.controls["name"].value;
    data.icon = formData.controls["icon"].value;

    return data;
  }

  deleteSubcategory(id: number) {
    this.setupService.deleteSubcategory(id).pipe(this.toast.observe({
      loading: "Deleting subcategory, please wait...",
      success: "Subcategory deleted successfully",
      error: "Failed to delete subcategory"
    })).subscribe((response: boolean) => {
      if (response) {
        this.getSubcategoriesList(this._selectedCategoryData.name, this._selectedCategoryData.id);
        this.closeModal("delete-subcategory-modal");
      } else {
        this.toast.error("Failed to delete subcategory");
      }
    }, (error) => {
      this.toast.error("Failed to delete subcategory");
    });
  }

  closeModal(id: string) {
    this.resetModalAttributes();
    if (id === "delete-subcategory-modal") {
      this.modalService.close(id);
    } else {
      this.modalService.close(id);
      this.subcategoryForm.reset();
      this.subcategoryForm.controls["icon"].setValue("");
    }
  }

  resetModalAttributes() {
    this._editSubcategory = false;
    this.showModal = false;
    this.showDeleteModal = false;
    this._formSubmit = false;
    this._updateId = 0;
    this._deleteId = 0;
  }
}
