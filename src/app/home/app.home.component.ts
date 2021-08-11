import { Component, OnInit } from "@angular/core";
import { ModalService } from "../common/modal-component/modal.service";

@Component({
  selector: "app-home",
  templateUrl: "./app.home.component.html",
  styleUrls: ["./app.home.component.scss"],
})

export class AppHomeComponent implements OnInit {
  showModal: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {  }

  openModal(id: string) {
    this.showModal = true;
    setTimeout(() => { this.modalService.open(id); }, 100);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.showModal = false;
  }
}
