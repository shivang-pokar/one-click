import { Component, Input, OnInit } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'one-click-instagram-post-ui',
  templateUrl: './instagram-post-ui.component.html',
  styleUrls: ['./instagram-post-ui.component.scss']
})
export class InstagramPostUiComponent implements OnInit {

  @Input() connection: any;
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  
  constructor(

  ) {

  }

  ngOnInit(): void {
    

  }

}
