import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ModalService } from "../../common/modal-component/modal.service";

@Component({
  selector: "setup-category",
  templateUrl: "./setup.category-tab.component.html",
  styleUrls: ["./setup.category-tab.component.scss"],
})

export class SetupCategoryComponent implements OnInit {
  @Input() enableActions: boolean = false;
  @Input() addCategory: Subject<boolean> = new Subject();
  showModal: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.addCategory.subscribe((action) => {
      this.openModal();
    });
  }

  openModal() {
    this.showModal = true;
    setTimeout(() => { this.modalService.open("setup-category-modal"); }, 100);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.showModal = false;
  }
}
