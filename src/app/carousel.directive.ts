import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

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
  constructor(private templateRef: TemplateRef<CarouselContext>, private viewContainerRef: ViewContainerRef) {
  }

  @Input('appCarouselFrom') images: string[];

  context: CarouselContext;
  index = 0;

  ngOnInit(): void {
    this.context = {
      $implicit: this.images[0],
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
    this.setContextDate();
  }

  prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this.context.$implicit = this.images[this.index];
    this.context.index = this.index;
  }

  private setContextDate() {
    this.context.$implicit = this.images[this.index];
    this.context.index = this.index;
  }
}
