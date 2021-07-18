import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const ACCESS_TOKEN = environment.accessToken;

@Injectable({ providedIn: 'root' })

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
}
