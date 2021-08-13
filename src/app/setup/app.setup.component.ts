import { Component } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-setup",
  templateUrl: "./app.setup.component.html",
  styleUrls: ["./app.setup.component.scss"],
})

export class AppSetupComponent {
  selectedTab: number = 1;
  editCategory: boolean = false;
  addNewCategory: Subject<boolean> = new Subject();

  insertNewCategory() {
    this.addNewCategory.next(true);
  }
}
