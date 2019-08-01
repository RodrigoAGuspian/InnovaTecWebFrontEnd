import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-ensayo-cloud-messe',
  templateUrl: './ensayo-cloud-messe.component.html',
  styleUrls: ['./ensayo-cloud-messe.component.css']
})
export class EnsayoCloudMesseComponent implements OnInit {

  constructor(private afMessaging: AngularFireMessaging) {

  }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  ngOnInit() {
  }

}
