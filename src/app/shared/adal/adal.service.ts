import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

import { OAuthData } from "./oauthdata";
import { AdalUser } from "./adaluser";
import { AdalConfig } from "./adalconfig";

declare const window:any;
declare const AuthenticationContext:any;

@Injectable()
export class AdalService {
    // Property to store adal context
    private _adalContext: any;
    // Property to store function to create adal context
    private _createAuthContextFn: any;
    // Property to store user info
    private _oauthData: OAuthData;
    // Property to store user info subject
    private _userInfo$: Subject<any>;

    /**
     * Service constructor
     */
    constructor() {
        this._createAuthContextFn = AuthenticationContext;
        this._oauthData = {
            isAuthenticated: false,
            userName: '',
            loginError: '',
            profile: {}
        };
        this._userInfo$ = <Subject<any>> new Subject();
    }

    /**
     * Function to init adal context
     *
     * @param configOptions
     */
    init(configOptions: AdalConfig) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }

        // redirect and logout_redirect are set to current location by default
        const existingHash = window.location.hash;
        let pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }

        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;

        // create instance with given config
        this._adalContext = new this._createAuthContextFn(configOptions);

        // loginresource is used to set authenticated status
        this._updateDataFromCache(this.config.loginResource);
    }

    /**
     * Returns adal context config
     *
     * @returns {AdalConfig}
     */
    get config(): AdalConfig {
        return this._adalContext.config;
    }

    /**
     * Returns user info
     *
     * @returns {OAuthData}
     */
    get userInfo(): OAuthData {
        return this._oauthData;
    }

    /**
     * Returns user info subject as observable
     *
     * @returns {Observable<any>}
     */
    get userInfo$(): Observable<any> {
        return this._userInfo$.asObservable();
    }

    /**
     * Function to login
     */
    login(): void {
        this._adalContext.login();
    }

    /**
     * Returns login in progress flag
     *
     * @returns {boolean}
     */
    loginInProgress(): boolean {
        return this._adalContext.loginInProgress();
    }

    /**
     * Function to logout
     */
    logOut(): void {
        this._adalContext.logOut();
    }

    /**
     * Function to handle window callback
     */
    handleWindowCallback(): void {
        const hash = window.location.hash;
        if (this.isCallback(hash)) {
            const requestInfo = this._adalContext.getRequestInfo(hash);
            this._adalContext.saveTokenFromHash(requestInfo);
            if ((requestInfo.requestType === this._adalContext.REQUEST_TYPE.RENEW_TOKEN) && window.parent && (window.parent !== window)) {
                // iframe call but same single page
                const callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
                if (callback){
                    callback(this._adalContext._getItem(this._adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters[this._adalContext.CONSTANTS.ACCESS_TOKEN] || requestInfo.parameters[this._adalContext.CONSTANTS.ID_TOKEN], this._adalContext._getItem(this._adalContext.CONSTANTS.STORAGE.ERROR));
                }
            } else if (requestInfo.requestType === this._adalContext.REQUEST_TYPE.LOGIN) {
                this._updateDataFromCache(this.config.loginResource);
                this._userInfo$.next();
            }
        }
    }

    /**
     * Returns cached token for current resource
     *
     * @param resource
     *
     * @returns {string}
     */
    getCachedToken(resource: string): string {
        return this._adalContext.getCachedToken(resource);
    }

    /**
     * Function to acquire token for given resource
     *
     * @param resource
     *
     * @returns {any}
     */
    acquireToken(resource: string): Observable<string> {
        return Observable.bindCallback((cb: (s: string) => void) => {
            this._adalContext.acquireToken(resource, (error: string, tokenOut: string) => {
                if (error) {
                    this._adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    cb(null);
                } else {
                    cb(tokenOut);
                }
            });
        })();
    }

    /**
     * Function to get user profile
     *
     * @returns {any}
     */
    getUser(): Observable<AdalUser> {
        return Observable.bindCallback((cb: (u: AdalUser) => void) => {
            this._adalContext.getUser((error: string, user: AdalUser) => {
                if (error) {
                    this._adalContext.error('Error when getting user', error);
                    cb(null);
                } else {
                    cb(user);
                }
            });
        })();
    }

    /**
     * Function to clear cache
     */
    clearCache(): void {
        this._adalContext.clearCache();
    }

    /**
     * Function to clear cache for given resource
     */
    clearCacheForResource(resource: string): void {
        this._adalContext.clearCacheForResource(resource);
    }

    /**
     * Returns resource for current endpoint
     *
     * @param url
     *
     * @returns {string}
     */
    getResourceForEndpoint(url: string): string {
        return this._adalContext.getResourceForEndpoint(url);
    }

    /**
     * Function to know if we are in callback
     *
     * @param hash
     *
     * @returns {boolean}
     */
    isCallback(hash?: string): boolean {
        const h = hash || window.location.hash;
        return this._adalContext.isCallback(h);
    }

    /**
     *
     * @param resource
     * @private
     */
    private _updateDataFromCache(resource: string): void {
        const token = this._adalContext.getCachedToken(resource);
        this._oauthData.isAuthenticated = token !== null && token.length > 0;
        const user = this._adalContext.getCachedUser();
        if (user) {
            this._oauthData.userName = user.userName;
            this._oauthData.profile = user.profile;
            this._oauthData.loginError = this._adalContext.getLoginError();
        } else {
            this._oauthData.userName = '';
            this._oauthData.profile = {};
            this._oauthData.loginError = '';
        }
    };
}
