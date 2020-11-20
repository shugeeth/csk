import { Component, NgZone, OnInit } from '@angular/core';
import { Fellow } from '../models/fellow';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    if(this.fellow !=null){
      this.isFellow= true;
    }
  }

  title = 'Chennai Students Kondattam V7.0';
  isCollapsed = true;
  fellow:Fellow;
  isFellow=false;

  constructor(private zone:NgZone, private accountService: AccountService) {
    this.accountService.fellow.subscribe(x => this.fellow = x);
      // this.accountService.fellow.subscribe((x) => {
      //   this.zone.run(() => {
      //     this.fellow = x;
      //   })
      // });
  }

  logout() {
    this.accountService.logout();
    this.isFellow= false;
  }
}
