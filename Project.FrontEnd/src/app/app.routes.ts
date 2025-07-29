import { WatchlistPage } from './Page-components/watchlist-page/watchlist-page';
import { VideoplayerPage } from './Page-components/videoplayer-page/videoplayer-page';
import { SearchPage } from './Page-components/search-page/search-page';
import { ProfilePage } from './Page-components/profile-page/profile-page';
import { SignupPage } from './Page-components/signup-page/signup-pag';
import { LoginPage } from './Page-components/login-page/login-page';
import { GenrePage } from './Page-components/genre-page/genre-page';
import { ErrorPage } from './Page-components/error-page/error-page';
import { Routes } from '@angular/router';
import { HomePage } from './Page-components/home-page/home-page';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full',title:'Home'},

    {path:'home',component:HomePage,title:'Home'},
    {path:'genres',component:GenrePage,title:'Genres'},
    {path:'login',component:LoginPage,title:'Login'},
    {path:'signup',component:SignupPage,title:'Signup'},
    {path:'profile',component:ProfilePage,title:'Profile'},
    {path:'search',component:SearchPage,title:'Search'},
    {path:'video',component:VideoplayerPage,title:'Videoplayer'},
    {path:'watchlist',component:WatchlistPage,title:'Watchlist'},

    {path:'**',component:ErrorPage,title:'Error'}
];
