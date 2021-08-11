import { Component, OnInit } from "@angular/core";
import { AppCommonService } from "../common/common.service";

@Component({
  selector: "app-layout",
  templateUrl: "./app.layout.component.html",
  styleUrls: ["./app.layout.component.scss"]
})

export class AppLayoutComponent implements OnInit {
  isAppUpdated: boolean = false;

  constructor(private commonService: AppCommonService) { }

  ngOnInit() {
    this.checkUpdates();
  }

  checkUpdates() {
    this.commonService.checkAppUpdates();
  }

  hideUpdateBanner() {
    this.isAppUpdated = false;
  }
}
