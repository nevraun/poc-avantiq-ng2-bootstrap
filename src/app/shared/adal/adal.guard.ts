import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { AdalService } from "./adal.service";

@Injectable()
export class AdalGuard implements CanActivate {
    constructor(private _adalService: AdalService, private _router: Router) {}

    canActivate() {
        if (!this._adalService.userInfo.isAuthenticated) {
            console.info('AdalGuard: User is not logged in - Redirect to /auth');
            this._router.navigate(['/auth'], { replaceUrl: true });
            return false;
        } else {
            console.info('AdalGuard: User is logged in as ' + this._adalService.userInfo.userName);
            return true;
        }
    }
}