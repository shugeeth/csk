import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Fellow } from './models/fellow';
import { AccountService } from './services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // public modalRef: BsModalRef;

  // constructor(private modalService: BsModalService) {}

  // public openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  fellow: Fellow;
  title: string = "Chennai Students Kondattam";

  constructor(private accountService: AccountService) {
      this.accountService.fellow.subscribe(x => this.fellow = x);
  }
}
