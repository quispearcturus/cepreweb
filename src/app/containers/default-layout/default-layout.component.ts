import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../providers/services";
import {INavData} from "@coreui/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-header/default-header.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getAll$().subscribe(response => {
      this.navItems = response.data;
    })
  }
}
