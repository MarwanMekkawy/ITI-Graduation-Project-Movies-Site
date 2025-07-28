import { Component } from '@angular/core';
import { VideoPlayer } from "../../child-components/video-player/video-player";

@Component({
  selector: 'app-videoplayer-page',
  imports: [VideoPlayer],
  templateUrl: './videoplayer-page.html',
  styleUrl: './videoplayer-page.css'
})
export class VideoplayerPage {

}
