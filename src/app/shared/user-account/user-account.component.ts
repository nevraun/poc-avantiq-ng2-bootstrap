import { Component, OnInit } from '@angular/core';
//import { environment } from "../../../environments/environment";
import { AdalService } from "../../shared/index";
import { OAuthData } from "../../shared/adal/oauthdata"

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private _adalService:AdalService) {}

  get userInfo():OAuthData {
    return this._adalService.userInfo;
  }

  connect() {
    this._adalService.login();
  }

  disconnect() {
    this._adalService.logOut();
  }

  ngOnInit(): void {
    //console.log('ON INIT APP');
    //this._adalService.init(environment.adalConfig);
  }
}
