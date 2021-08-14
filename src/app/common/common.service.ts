import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../projects/track-expense-login/src/environments/environment.prod";

const API_URL = environment.apiUrl;

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
