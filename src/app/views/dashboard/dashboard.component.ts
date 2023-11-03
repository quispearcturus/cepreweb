import {Component, OnInit} from '@angular/core';
import {User} from "../../containers/default-layout/default-header/model/user";
import {UserService} from "../../providers/services/oauth/user.service";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user = new User();
  public hour = new Date().getHours();
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    //this.initCharts();
    this.getUser();
  }
  public getUser(): void {
    this.userService.getAll$().subscribe(response => {
      this.user = response.data || {};
    });
  }

}
