import { Injectable } from "@angular/core";
import { environment } from "../../../projects/track-expense-login/src/environments/environment.prod";

const ACCESS_TOKEN = environment.accessToken;

@Injectable({ providedIn: "root" })

export class AppTokenService {
  constructor() { }

  getLoginToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getToken(tokenName: string): string | null {
    return localStorage.getItem(tokenName);
  }

  saveToken(tokenName: string, token: string): void {
    localStorage.setItem(tokenName, token);
  }

  removeToken(tokenName: string): void {
    localStorage.removeItem(tokenName);
  }

  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("te.email");
  }
}
