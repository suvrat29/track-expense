import { Component, Input } from "@angular/core";

@Component({
  selector: "setup-category",
  templateUrl: "./setup.category-tab.component.html",
  styleUrls: ["./setup.category-tab.component.scss"],
})

export class SetupCategoryComponent {
  @Input() enableActions: boolean = false;
}
