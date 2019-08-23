import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  fechaActual: number = Date.now();
  color = '#ffffff64';
  constructor(public router: Router) { }

  ngOnInit() {
  }
  viewContactanos() {
    this.router.navigate(['contactanos']);
  }

}
