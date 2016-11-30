/**
 * Created by nevraun on 2016/11/28.
 */
import { HomeComponent } from "./home.component";
import { AdalGuard } from "../shared/index";

export const HOME_ROUTES = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AdalGuard]
  }
];
