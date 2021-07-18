import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppTokenService } from './auth-module/app.token.service';

@Injectable({
  providedIn: 'root'
})

export class AppGuard implements CanActivate {
  constructor(private tokenService: AppTokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.tokenService.getLoginToken()) {
      return true;
    }

    this.router.navigate(['/login']).then(_ => false);

    return false;
  }
}
