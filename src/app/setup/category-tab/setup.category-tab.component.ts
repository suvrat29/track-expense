import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { HotToastService } from "@ngneat/hot-toast";
import { Subject } from "rxjs";
import { ModalService } from "../../common/modal-component/modal.service";
import { IAddNewCategory, ICategoryData, IUpdateCategory } from "../app.setup.interface";
import { AppSetupService } from "../app.setup.service";

@Component({
  selector: "setup-category",
  templateUrl: "./setup.category-tab.component.html",
  styleUrls: ["./setup.category-tab.component.scss"],
})

export class SetupCategoryComponent implements OnInit {
  @Input() addCategory: Subject<boolean> = new Subject();
  categoryData: Array<ICategoryData> = [] as Array<ICategoryData>;
  categoryForm: FormGroup;
  @Input() enableActions: boolean = false;
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  _pageLoad: boolean = true;
  _noData: boolean = true;
  _pageError: boolean = false;
  _editCategory: boolean = false;
  _formSubmit: boolean = false;
  _deleteId: number = 0;
  _updateId: number = 0;

  constructor(private modalService: ModalService, private setupService: AppSetupService, private toast: HotToastService, private sanitizer: DomSanitizer) {
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      icon: new FormControl(""),
      description: new FormControl(""),
    });
  }

  ngOnInit() {
    this.addCategory.subscribe((action) => {
      this.openModal();
    });

    this.getCategoriesList();
  }

  getCategoriesList() {
    this.setupService.getAllCategories().subscribe((response: Array<ICategoryData>) => {
      this._pageLoad = false;
      if (response.length > 0) {
        this._noData = false;
        this.categoryData = response;
        this.categoryData.forEach((value: ICategoryData) => {
          if (value.icon.length > 0) {
            value.iconSafe = this.sanitizer.bypassSecurityTrustHtml(value.icon);        //This is needed to render images from SVG
          }
        });
      } else {
        this._noData = true;
      }
    }, (error) => {
      this._pageLoad = false;
      this._noData = true;
      this._pageError = true;
    });
  }

  openModal() {
    this.manageOpenAddForm();
    setTimeout(() => { this.modalService.open("setup-category-modal"); }, 100);
  }

  manageOpenAddForm() {
    this.showModal = true;
    this.showDeleteModal = false;
    this._editCategory = false;
    this._formSubmit = false;
    this._deleteId = 0;
    this._updateId = 0;
  }

  openEditModal(id: number) {
    this.setFormData(id);
    this.managerOpenEditForm(id);
    setTimeout(() => { this.modalService.open("setup-category-modal"); }, 100);
  }

  managerOpenEditForm(id: number) {
    this._editCategory = true;
    this.showModal = true;
    this.showDeleteModal = false;
    this._formSubmit = false;
    this._deleteId = 0;
    this._updateId = id;
  }

  setFormData(id: number) {
    let data: ICategoryData | undefined = this.categoryData.find((x) => x.id === id);

    this.categoryForm.controls["name"].setValue(data!.name);
    this.categoryForm.controls["type"].setValue(data!.type);
    this.categoryForm.controls["icon"].setValue(data!.icon);
    this.categoryForm.controls["description"].setValue(data!.description);
  }

  openDeleteModal(id: number) {
    this.manageOpenDeleteModal(id);
    setTimeout(() => { this.modalService.open("delete-category-modal"); }, 100);
  }

  manageOpenDeleteModal(id: number) {
    this._editCategory = false;
    this.showModal = false;
    this.showDeleteModal = true;
    this._formSubmit = false;
    this._deleteId = id;
    this._updateId = 0;
  }

  changeType(e: any) {
    this.categoryForm.controls["type"].setValue(e.target.value, { onlySelf: true });
  }

  processCategoryRequest(formData: FormGroup) {
    this._formSubmit = true;
    if (!this._editCategory) {
      if (formData.status === "VALID") {
        let postData: IAddNewCategory = this.mapNewCategoryData(formData);
        this.setupService.addNewCategory(postData).pipe(this.toast.observe({
          loading: "Adding new category, please wait...",
          success: "Category added successfully",
          error: "Failed to add category"
        })).subscribe((response: boolean) => {
          if (response) {
            this.closeModal('setup-category-modal');
            this.getCategoriesList();
          }
          else {
            this._formSubmit = false;
            this.toast.error("Failed to add category");
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
        let postData: IUpdateCategory = this.mapUpdateCategoryData(formData);
        this.setupService.updateCategory(postData).pipe(this.toast.observe({
          loading: "Updating category details, please wait...",
          success: "Category updated successfully",
          error: "Failed to update category"
        })).subscribe((response: boolean) => {
          if (response) {
            this.closeModal('setup-category-modal');
            this.getCategoriesList();
          }
          else {
            this._formSubmit = false;
            this.toast.error("Failed to update category");
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

  mapNewCategoryData(formData: FormGroup): IAddNewCategory {
    let data: IAddNewCategory = {} as IAddNewCategory;

    data.name = formData.controls["name"].value;
    data.type = formData.controls["type"].value;
    data.icon = formData.controls["icon"].value;
    data.description = formData.controls["description"].value;

    return data;
  }

  mapUpdateCategoryData(formData: FormGroup): IUpdateCategory {
    let data: IUpdateCategory = {} as IUpdateCategory;

    data.id = this._updateId;
    data.name = formData.controls["name"].value;
    data.type = formData.controls["type"].value;
    data.icon = formData.controls["icon"].value;
    data.description = formData.controls["description"].value;

    return data;
  }

  deleteCategory(id: number) {
    this.setupService.deleteCategory(id).pipe(this.toast.observe({
      loading: "Deleting category, please wait...",
      success: "Category deleted successfully",
      error: "Failed to delete category"
    })).subscribe((response: boolean) => {
      if (response) {
        this.getCategoriesList();
        this.closeModal("delete-category-modal");
      } else {
        this.toast.error("Failed to delete category");
      }
    }, (error) => {
      this.toast.error("Failed to delete category");
    });
  }

  closeModal(id: string) {
    this.resetModalAttributes();
    if (id === "delete-category-modal") {
      this.modalService.close(id);
    } else {
      this.categoryForm.reset();
    }
  }

  resetModalAttributes() {
    this._editCategory = false;
    this.showModal = false;
    this.showDeleteModal = false;
    this._formSubmit = false;
    this._deleteId = 0;
    this._updateId = 0;
  }
}
