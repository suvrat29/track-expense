import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IUserProfileData, IUserProfileUpdateData } from "./app.user-profile-interfaces";

const API_URL = environment.apiUrl;

@Injectable()

export class AppUserProfileService {
  private baseUrl = "Profile/";

  constructor(private http: HttpClient) { }

  getProfileData() {
    return this.http.get<IUserProfileData>(API_URL + this.baseUrl + "get-profile-data");
  }

  updateProfileData(postData: IUserProfileUpdateData) {
    return this.http.post<boolean>(API_URL + this.baseUrl + "update-user-profile", postData);
  }
}
