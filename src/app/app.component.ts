import {Component} from '@angular/core';
import {GplusGalleryService} from './gplus-gallery.service';

import {GplusGalleryRef} from './gplus-gallery-ref';

import {IMAGES} from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images = IMAGES;

  constructor(private previewDialog: GplusGalleryService) {
  }

  showGallery(index: number) {
    let dialogRef: GplusGalleryRef = this.previewDialog.open({
      index: index
    });
  }
}
