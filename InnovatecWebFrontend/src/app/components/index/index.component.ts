import { Component, OnInit } from '@angular/core';
import { NovedadService } from 'src/app/shared/services/novedad.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private novedadesService: NovedadService) { }

  ngOnInit() {
  }

}
