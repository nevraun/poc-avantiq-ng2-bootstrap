export interface AdalConfig {
    tenant?: string;
    clientId: string;
    redirectUri?: string;
    instance?: string;
    endpoints?: any;  // If you need to send CORS api requests.
    popUp?: boolean;
    localLoginUrl?: string;
    displayCall?: (urlNavigate: string) => any;
    postLogoutRedirectUri?: string; // redirect url after succesful logout operation
    cacheLocation?: string;
    anonymousEndpoints?: any;
    expireOffsetSeconds?:number;
    correlationId?:string;
    loginResource?:string;
}