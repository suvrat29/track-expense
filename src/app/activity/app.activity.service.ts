import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../projects/track-expense-login/src/environments/environment.prod";
import { IUserActivityLog } from "./app.activity.interface";

const API_URL = environment.apiUrl;

@Injectable()

export class AppActivityService {
  private baseUrl = "Activity/";

  constructor(private http: HttpClient) { }

  getUserActivity() {
    return this.http.get<Array<IUserActivityLog>>(API_URL + this.baseUrl + "get-user-activity");
  }
}
