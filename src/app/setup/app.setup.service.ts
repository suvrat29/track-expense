import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAddNewCategory, ICategoryData, IUpdateCategory } from "./app.setup.interface";

const API_URL = process.env.apiUrl;

@Injectable()

export class AppSetupService {
  private baseUrl = "Setup/";

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Array<ICategoryData>>(API_URL + this.baseUrl + "get-all-categories");
  }

  addNewCategory(postData: IAddNewCategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "add-new-category", postData);
  }

  updateCategory(postData: IUpdateCategory) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "update-category", postData);
  }

  deleteCategory(categoryId: number) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "delete-category?categoryId=" + categoryId, {});
  }
}
