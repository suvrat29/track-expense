import { Component, HostListener } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-setup",
  templateUrl: "./app.setup.component.html",
  styleUrls: ["./app.setup.component.scss"],
})

export class AppSetupComponent {
  @HostListener("document:click", ["$event"]) onDocumentClick(event: any) {
    this.actionMenu = false;
  }
  selectedTab: number = 1;
  editCategory: boolean = false;
  actionMenu: boolean = false;
  addNewCategory: Subject<boolean> = new Subject();

  insertNewCategory() {
    this.addNewCategory.next(true);
  }
}
