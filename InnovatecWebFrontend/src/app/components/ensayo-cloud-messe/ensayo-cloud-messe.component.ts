import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MessagingService } from 'src/app/shared/services/messaging.service';


@Component({
  selector: 'app-ensayo-cloud-messe',
  templateUrl: './ensayo-cloud-messe.component.html',
  styleUrls: ['./ensayo-cloud-messe.component.css']
})
export class EnsayoCloudMesseComponent implements OnInit {
  message;
  constructor(private afMessaging: AngularFireMessaging, private messagingService: MessagingService) {

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
    const userId = 'V2ZI52y9Q6SstD6tMDJu1pThDvj2';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

}
