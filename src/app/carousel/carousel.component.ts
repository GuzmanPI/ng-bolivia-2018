import {Component, Inject} from '@angular/core';
import {IMAGES} from "../data";
import {GPLUS_GALLERY_DATA} from "../gplus-gallery.tokens";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = IMAGES;
}
