import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";

const ACCESS_TOKEN = environment.accessToken;

@Injectable({ providedIn: "root" })

export class TokenService {
  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  saveToken(token: any): void {
    localStorage.setItem(ACCESS_TOKEN, token.token);
    localStorage.setItem("te.email", token.user.email);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("te.email");
  }

  checkLogin(): boolean {
    if (this.getToken()) {
      return true;
    }

    return false;
  }
}
