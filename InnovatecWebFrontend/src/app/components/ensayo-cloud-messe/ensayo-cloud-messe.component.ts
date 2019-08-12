import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-ensayo-cloud-messe',
  templateUrl: './ensayo-cloud-messe.component.html',
  styleUrls: ['./ensayo-cloud-messe.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EnsayoCloudMesseComponent implements OnInit {

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
  };
  constructor(private afMessaging: AngularFireMessaging, private messagingService: MessagingService) {

  }

  ngOnInit() {

  }


}
