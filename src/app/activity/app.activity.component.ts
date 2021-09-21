import { Component, OnInit } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { IUserActivityLog } from "./app.activity.interface";
import { AppActivityService } from "./app.activity.service";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { AppCommonService } from "../common/common.service";

@Component({
  selector: "activity",
  templateUrl: "./app.activity.component.html",
  styleUrls: ["./app.activity.component.scss"],
})

export class AppActivityComponent implements OnInit {
  userActivityLogData: Array<IUserActivityLog> = [] as Array<IUserActivityLog>;
  _pageLoad: boolean = true;
  _noData: boolean = true;
  _pageError: boolean = false;

  constructor(private activityService: AppActivityService, private commonService: AppCommonService, private toast: HotToastService) { }

  ngOnInit() {
    this.getUserActivitylogData();
  }

  getUserActivitylogData() {
    this.activityService.getUserActivity().subscribe((response: Array<IUserActivityLog>) => {
      this._pageLoad = false;
      if (response.length > 0) {
        this._noData = false;
        this.userActivityLogData = response;
        this.userActivityLogData.forEach((activity) => {
          activity.actiondate = formatDistanceToNow(this.commonService.adjustForTimezone(parseISO(activity.actiondate)), { addSuffix: true });
        });
      } else {
        this._noData = true;
      }
    }, (error) => {
      this._pageLoad = false;
      this._noData = true;
      this._pageError = true;
    })
  }
}
