import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule, MatListModule, MatIconModule, MatButtonModule} from '@angular/material';

import {OverlayModule} from '@angular/cdk/overlay';

import {AppComponent} from './app.component';
import {GplusGalleryService} from './gplus-gallery.service';
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselDirective} from "./carousel.directive";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
    FlexLayoutModule
  ],
  declarations: [AppComponent, CarouselComponent, CarouselDirective],
  bootstrap: [AppComponent],
  providers: [
    GplusGalleryService
  ],
  entryComponents: [
    CarouselComponent
  ]
})
export class AppModule {
}
