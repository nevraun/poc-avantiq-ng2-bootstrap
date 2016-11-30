import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdalService } from "../shared/index";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // private variable to store login in progress flag
  private _isLoginInProgress: boolean;
  // private property to store user info subscription
  private _userInfoSubscription: Subscription;

  constructor(private _router: Router, private _adalService:AdalService) {
    this._isLoginInProgress = false;
  }

  get isLoginInProgress(): boolean {
    return this._isLoginInProgress;
  }

  ngOnInit() {
    console.log('ON INIT LOGIN', this._router.url);
    this._userInfoSubscription = this._adalService.userInfo$.subscribe(_ => this._redirectIfAuthenticated());

    this._adalService.handleWindowCallback();

    // check if we are not on callback hash
    if (!this._adalService.isCallback()) {
      console.log('NOT IN CALLBACK');
      this._redirectIfAuthenticated();
    }
  }

  ngOnDestroy() {
    if (this._userInfoSubscription) {
      this._userInfoSubscription.unsubscribe();
    }
  }

  connect() {
    this._adalService.login();
    this._isLoginInProgress = this._adalService.loginInProgress();
  }

  private _redirectIfAuthenticated() {
    if (this._adalService.userInfo.isAuthenticated) {
      console.log('USER AUTHENTICATED - REDIRECT TO HOME');
      this._router.navigate(['/home'], { replaceUrl: true });
    }
  }
}

