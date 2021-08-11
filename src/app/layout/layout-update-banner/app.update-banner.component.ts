import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-update-banner",
  templateUrl: "./app.update-banner.component.html",
  styleUrls: ["./app.update-banner.component.scss"],
})

export class AppUpdateBannerComponent {
  @Output() isBannerDismissed = new EventEmitter<boolean>();

  constructor() { }

  dismissBanner() {
    this.isBannerDismissed.emit(true);
  }
}
