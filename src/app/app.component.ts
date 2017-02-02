import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { AdalService } from "./shared/index";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _adalService:AdalService, private router: Router) {}

  get isLogged():boolean {
    return this._adalService.userInfo.isAuthenticated;
  }

  ngOnInit(): void {
    console.log('ON INIT APP');
    this._adalService.init(environment.adalConfig);
  }
}
