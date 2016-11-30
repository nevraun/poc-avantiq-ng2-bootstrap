import { AdalService } from "./adal.service";
import { AdalGuard } from "./adal.guard";
import { AdalHttpService } from "./adalhttp.service";

export const ADAL_PROVIDERS: any[] = [
    {provide: AdalService, useClass: AdalService},
    {provide: AdalGuard, useClass: AdalGuard},
    {provide: AdalHttpService, useClass: AdalHttpService}
];