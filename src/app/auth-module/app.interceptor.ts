import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { AppTokenService } from "./app.token.service";
import { catchError, map } from "rxjs/operators";

@Injectable()

export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tokenService: AppTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const loginToken = this.tokenService.getLoginToken();

    if (loginToken) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + loginToken
        }
      });
    }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        setHeaders: {
          "content-type": "application/json"
        }
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //console.log('event--->>>', event);
      }
      return event;
    }), catchError((error: HttpErrorResponse) => {
      //console.log(error.error.error);
      if (error.status === 401) {
        this.tokenService.clearTokens();
        window.location.href = "../login/";
      }
      return throwError(error);
    }));
  }
}
