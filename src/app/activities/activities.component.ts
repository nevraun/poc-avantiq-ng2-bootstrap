import { Component, OnInit } from '@angular/core';
import { AvantiqService, Office365Service } from "../shared/index";
import { Router } from '@angular/router';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  private _activities: any[];
  private _me: { DisplayName: "" };

  private sort: SortDescriptor[] = [];
  private gridView: GridDataResult;

  constructor(private _avantiqService: AvantiqService, private _office365Service: Office365Service, private router: Router) {
    this._activities = [];
    this.refreshGridView();
  }

  get activities() : any[] {
    return this._activities;
  }

  get me() : any {
    return this._me;
  }

  ngOnInit() {
    // call API to get activities

    if (this.router.isActive("/organize/myactivities", true))
    {
      this._avantiqService.myActivities().subscribe(activities => {
        this._activities = activities;
        this.refreshGridView();
        //console.log(activities);
      }, error => console.error(error));
    }
    else {
      this._avantiqService.activities().subscribe(activities => {
        this._activities = activities;
        this.refreshGridView();
        //console.log(activities);
      }, error => console.error(error));
    }

    // call office 365
      this._office365Service.me().subscribe(me => {
        this._me = me;
        console.log(me);
      }, error => console.error(error));
  }

  protected sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.refreshGridView();
  }

  private refreshGridView(): void {
    this.gridView = {
      data: orderBy(this._activities, this.sort),
      total: this._activities.length
    };
  }
}
