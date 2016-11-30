import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from "@angular/http";
import { AdalHttpService } from "../index";
import {environment} from '../../../environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class AvantiqService {
    // private property to store host request
    private _host: string;
    // private property to store request options
    private _requestOptions: RequestOptions;

    /**
     * Service constructor
     *
     * @param _adalHttpService
     */
    constructor(private _adalHttpService: AdalHttpService) {
        this._host = `${environment.avantiq.protocol}://${environment.avantiq.host}`;
        if (environment.avantiq.port) {
            this._host += `:${environment.avantiq.port}`;
        }

        // set request options
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this._requestOptions = new RequestOptions({ headers: headers });
    }

    /**
     * Returns activities
     *
     * @param secure
     *
     * @returns {Observable<any>}
     */
    activities(secure: boolean = true): Observable<any> {
        let uri: string = `${this._host}`;
        if (secure) {
            uri += `${environment.avantiq.endpoints.private.activities}`;
        }
        return this._adalHttpService.get(uri, this._requestOptions);
    }
}
