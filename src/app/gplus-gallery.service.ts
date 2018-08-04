import {Injectable, Injector, ComponentRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';

import {GplusGalleryRef} from './gplus-gallery-ref';
import {GPLUS_GALLERY_DATA} from './gplus-gallery.tokens';
import {CarouselComponent} from "./carousel/carousel.component";

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  index?: number;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  index: null
};

@Injectable()
export class GplusGalleryService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) {
  }

  open(config: FilePreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = {...DEFAULT_CONFIG, ...config};

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new GplusGalleryRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: GplusGalleryRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(CarouselComponent, null, injector);
    const containerRef: ComponentRef<CarouselComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: FilePreviewDialogConfig, dialogRef: GplusGalleryRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(GplusGalleryRef, dialogRef);
    injectionTokens.set(GPLUS_GALLERY_DATA, config.index);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}