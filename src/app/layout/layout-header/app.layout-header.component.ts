//import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { AppTokenService } from "../../auth-module/app.token.service";
import { AppCommonService } from "../../common/common.service";

@Component({
  selector: "app-layout-header",
  templateUrl: "./app.layout-header.component.html",
  styleUrls: ["./app.layout-header.component.scss"],
  //animations: [                  //Makes UI Clunky
  //  trigger('profileMenuAnimate', [
  //    state('Leaving', style({
  //      opacity: '0',
  //      transform: 'translateY(0)'
  //    })),
  //    state('Entering', style({
  //      opacity: '100',
  //      transform: 'translateY(1)'
  //    })),
  //    transition('Entering => Leaving', [
  //      animate('0.15s ease-out')
  //    ]),
  //    transition('Leaving => Entering', [
  //      animate('0.15s ease-in')
  //    ])
  //  ])
  //]
})

export class AppLayoutHeaderComponent implements OnInit {
  @HostListener("document:click", ["$event"]) onDocumentClick(event: any) {
    this.profileMenu = false;
    this.profileMenu = false;
  }

  profileMenu: boolean = false;
  mobileHeaderMenu: boolean = false;
  isImagePresent: boolean = false;
  imageLink: string = "";
  firstName: string = "";
  lastName: string = "";
  selectedMenu: number = 1;

  constructor(private commonService: AppCommonService, private toaster: HotToastService, private tokenService: AppTokenService) {
    if (window.location.pathname === "/content/") {
      this.selectedMenu = 1;
    } else if (window.location.pathname === "/content/activity") {
      this.selectedMenu = 3;
    } else {
      this.selectedMenu = 4;
    }
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.commonService.getUserData().subscribe((response: any) => {
      if (response) {
        if (response.avatar && response.avatar.length > 0) {
          this.isImagePresent = true;
          this.imageLink = response.avatar;
        } else {
          this.isImagePresent = false;
          this.firstName = response.firstname.charAt(0);
          this.lastName = response.lastname.charAt(0);
        }
      } else {
        this.isImagePresent = false;
      }
    }, error => {
      this.isImagePresent = false;
    });
  }

  logout() {
    this.tokenService.clearTokens();
    this.toaster.show("Successfully logged out");
    window.location.href = "../login/";
  }
}
