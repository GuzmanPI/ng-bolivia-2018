import { OverlayRef } from '@angular/cdk/overlay';

export class GplusGalleryRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
