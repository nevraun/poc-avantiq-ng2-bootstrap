/**
 * Created by nevraun on 2016/11/30.
 */
import { ActivitiesComponent } from "./activities.component";
import { AdalGuard } from "../shared/index";

export const ACTIVITIES_ROUTES = [
  {
    path: 'organize/activities',
    component: ActivitiesComponent,
    canActivate: [AdalGuard]
  },
  {
    path: 'organize/myactivities',
    component: ActivitiesComponent,
    canActivate: [AdalGuard]
  }
];
