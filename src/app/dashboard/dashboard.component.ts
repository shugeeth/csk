import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fellow } from '../models/fellow';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fellow: Fellow;
  router: string;

  constructor(private accountService: AccountService, private _router: Router) {
    this.fellow = this.accountService.fellowValue;
    this.router = _router.url;
  }

  ngOnInit(): void {}

}
