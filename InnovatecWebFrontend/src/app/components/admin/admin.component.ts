import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {
  public viewChart = 0;
  constructor(public authservice: AuthService) { }

  ngOnInit() {
  }

  public viewChange(modo: number) {
    this.viewChart = modo;
  }


}
