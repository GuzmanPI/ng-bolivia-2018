import {Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {GPLUS_GALLERY_DATA} from "./gplus-gallery.tokens";

export interface CarouselContext {
  $implicit: string;
  controller: {
    next: () => void;
    prev: () => void;
  };
  index: number;
}

@Directive({
  selector: '[appCarousel]',
})
export class CarouselDirective implements OnInit {
  context: CarouselContext;

  constructor(
    private templateRef: TemplateRef<CarouselContext>,
    private viewContainerRef: ViewContainerRef,
    @Inject(GPLUS_GALLERY_DATA) public index: any) {}

  @Input('appCarouselFrom') images: string[];

  ngOnInit(): void {
    this.context = {
      $implicit: this.images[this.index],
      controller: {
        next: () => this.next(),
        prev: () => this.prev(),
      },
      index: 0
    };
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  next(): void {
    this.index++;
    if (this.index >= this.images.length) {
      this.index = 0;
    }
    this.context.$implicit = this.images[this.index];
    this.context.index = this.index;
  }

  prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this.context.$implicit = this.images[this.index];
    this.context.index = this.index;
  }
}
