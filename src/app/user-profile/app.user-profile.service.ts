import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IUserProfileData } from "../interfaces/user-profile-interfaces";

const API_URL = environment.apiUrl;

@Injectable()

export class AppUserProfileService {
  private baseUrl = 'Profile/';

  constructor(private http: HttpClient) { }

  getProfileData() {
    return this.http.get<IUserProfileData>(API_URL + this.baseUrl + 'get-profile-data');
  }
}
