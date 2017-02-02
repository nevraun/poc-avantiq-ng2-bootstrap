import { Office365Service } from "./office365.service";
import { AdalHttpService } from "../adal/adalhttp.service";

export const OFFICE365_PROVIDERS: any[] = [
  {
    provide: Office365Service,
    useFactory: (_adalHttpService: AdalHttpService) => new Office365Service(_adalHttpService),
    deps: [AdalHttpService]
  }
];
