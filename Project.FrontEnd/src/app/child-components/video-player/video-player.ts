import { Component, Input, ElementRef, AfterViewInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
  imports: [],
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
  @Input({ required: true }) cloudName!: string;
@Input({ required: true }) publicId!: string;

  @ViewChild('videoRef', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  private player: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  /* how to use the component <app-video-player  cloudName="dd3chr1un"
  publicId="v1753532374/Countdown_-_Official_Trailer_Prime_Video_dacwsx" ></app-video-player>*/

  ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    import('cloudinary-video-player').then(cloudinary => {
      this.player = (cloudinary as any).default.videoPlayer(this.videoRef.nativeElement, {
        cloudName: this.cloudName
      });

      this.player.source(this.publicId);

      // Wait for metadata to be fully loaded
      this.player.on('loadedmetadata', () => {
        const duration = this.videoRef.nativeElement.duration;
        console.log('Video duration:', duration); // Use it as needed
      });
    });
  }
}


  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
