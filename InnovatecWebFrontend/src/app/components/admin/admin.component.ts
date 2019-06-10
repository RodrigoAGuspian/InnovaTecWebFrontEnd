import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  changes = [false, false, false, false , false , false, false, false];
  constructor() { }

  ngOnInit() {
  }

}
