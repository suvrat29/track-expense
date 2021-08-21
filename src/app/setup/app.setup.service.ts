import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../../projects/track-expense-login/src/environments/environment.prod";
import { IAddNewCategory, IAddNewSubcategory, ICategoryData, ISubcategoryData, IUpdateCategory, IUpdateSubcategory } from "./app.setup.interface";

const API_URL = environment.apiUrl;

@Injectable()

export class AppSetupService {
  private baseUrl = "Setup/";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getAllCategories(fetchSubcategoryCount: boolean) {
    return this.http.get<Array<ICategoryData>>(API_URL + this.baseUrl + "get-all-categories?fetchSubcategoryCount=" + fetchSubcategoryCount);
  }

  getAllSubcategoriesByCategory(categoryId: number) {
    return this.http.get<Array<ISubcategoryData>>(API_URL + this.baseUrl + "get-all-subcategories?categoryId=" + categoryId);
  }

  addNewCategory(postData: IAddNewCategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "add-new-category", postData);
  }

  addNewSubcategory(postData: IAddNewSubcategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "add-new-subcategory", postData);
  }

  updateCategory(postData: IUpdateCategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "update-category", postData);
  }

  updateSubcategory(postData: IUpdateSubcategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "update-subcategory", postData);
  }

  deleteCategory(categoryId: number) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "delete-category?categoryId=" + categoryId, {});
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "delete-subcategory?subcategoryId=" + subcategoryId, {});
  }

  processCategoryListData(apiData: Array<ICategoryData>): Array<ICategoryData> {
    apiData.forEach((value: ICategoryData) => {
      if (value.icon) {
        if (value.icon.length > 0) {
          value.iconSafe = this.sanitizer.bypassSecurityTrustHtml(value.icon);        //This is needed to render images from SVG
        } else {
          value.iconSafe = "";
          value.icon = "";
        }
      } else {
        value.iconSafe = "";
        value.icon = "";
      }

      if (value.description) {
        if (value.description.length == 0) {
          value.description = "";
        }
      } else {
        value.description = "";
      }
    });

    return apiData;
  }

  processSubcategoryListData(apiData: Array<ISubcategoryData>): Array<ISubcategoryData> {
    apiData.forEach((value: ISubcategoryData) => {
      if (value.icon) {
        if (value.icon.length > 0) {
          value.iconSafe = this.sanitizer.bypassSecurityTrustHtml(value.icon);        //This is needed to render images from SVG
        } else {
          value.iconSafe = "";
          value.icon = "";
        }
      } else {
        value.iconSafe = "";
        value.icon = "";
      }
    });

    return apiData;
  }
}
