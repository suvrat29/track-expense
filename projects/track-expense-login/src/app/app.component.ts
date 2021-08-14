import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "./auth-service/auth.token.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "track-expense-login";
  _loggedIn: boolean = false;

  //TODO: Later add a check if authData exists then directly login, else take to the login page
  constructor(private router: Router, private authService: TokenService) {
    this._loggedIn = authService.checkLogin();
  }
}
