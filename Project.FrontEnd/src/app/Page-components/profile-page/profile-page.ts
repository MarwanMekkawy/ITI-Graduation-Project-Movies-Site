import { Component } from '@angular/core';
import { Profile } from "../../child-components/profile/profile";

@Component({
  selector: 'app-profile-page',
  imports: [Profile],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {

}
