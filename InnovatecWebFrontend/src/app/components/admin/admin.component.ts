import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public viewChart = 0;
  constructor() { }

  ngOnInit() {
  }

  public viewChange(modo: number) {
    this.viewChart = modo;
  }

}
