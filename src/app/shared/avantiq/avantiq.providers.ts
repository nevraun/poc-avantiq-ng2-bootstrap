import { AvantiqService } from "./avantiq.service";
import { AdalHttpService } from "../adal/adalhttp.service";

export const AVANTIQ_PROVIDERS: any[] = [
    {
        provide: AvantiqService,
        useFactory: (_adalHttpService: AdalHttpService) => new AvantiqService(_adalHttpService),
        deps: [AdalHttpService]
    }
];