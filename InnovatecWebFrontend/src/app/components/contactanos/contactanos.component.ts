import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  title = 'Ubicación de la casa solar';
  lat = 2.483347;
  lng = -76.561823;
  constructor() { }

  ngOnInit() {
  }

}
