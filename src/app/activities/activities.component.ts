import { Component, OnInit } from '@angular/core';
import { AvantiqService } from "../shared/index";

import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  private _activities: any[];

  private sort: SortDescriptor[] = [];
  private gridView: GridDataResult;

  constructor(private _avantiqService: AvantiqService) {
    this._activities = [];
    this.refreshGridView();
  }

  get activities() : any[] {
    return this._activities;
  }

  ngOnInit() {
    // call API to get activities
    this._avantiqService.activities().subscribe(activities => {
      this._activities = activities;
      this.refreshGridView();
      //console.log(activities);
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
