/**
 * Created by nevraun on 2016/12/02.
 */
import { SearchComponent } from "./search.component";
import { AdalGuard } from "../shared/index";

export const SEARCH_ROUTES = [
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AdalGuard]
  }
];
