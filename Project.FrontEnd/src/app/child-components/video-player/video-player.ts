import { Component, Input, ElementRef, AfterViewInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
  @Input() cloudName!: string;
  @Input() publicId!: string;
  @Input() width: string = '100%';
  @Input() height: string = '360';
  @ViewChild('videoRef', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  private player: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  /* how to use the component <app-video-player  cloudName="dd3chr1un"
  publicId="v1753532374/Countdown_-_Official_Trailer_Prime_Video_dacwsx" ></app-video-player>*/

  ngAfterViewInit(): void {
    // Only load player in the browser (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      import('cloudinary-video-player').then(cloudinary => {
        this.player = (cloudinary as any).default.videoPlayer(this.videoRef.nativeElement, {
          cloudName: this.cloudName
        });
        this.player.source(this.publicId);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
