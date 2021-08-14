import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API_URL = process.env.apiUrl;

@Injectable({ providedIn: "root" })

export class AppCommonService {
  private baseUrl = "Common/";

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get(API_URL + this.baseUrl + "data");
  }

  checkAppUpdates() {

  }
}
