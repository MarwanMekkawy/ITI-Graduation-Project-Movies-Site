import { SeriesplayerPage } from './Page-components/seriesplayer-page/seriesplayer-page';
import { MoviesplayerPage } from './Page-components/moviesplayer-page/moviesplayer-page';
import { SeriesPage } from './Page-components/series-page/series-page';
import { MoviesPage } from './Page-components/movies-page/movies-page';
import { WatchlistPage } from './Page-components/watchlist-page/watchlist-page';
import { SearchPage } from './Page-components/search-page/search-page';
import { ProfilePage } from './Page-components/profile-page/profile-page';
import { SignupPage } from './Page-components/signup-page/signup-page';
import { LoginPage } from './Page-components/login-page/login-page';
import { ErrorPage } from './Page-components/error-page/error-page';
import { Routes } from '@angular/router';
import { HomePage } from './Page-components/home-page/home-page';
import { AllgenresPage } from './Page-components/allgenres-page/allgenres-page';
import { WelcomePage } from './Page-components/welcome-page/welcome-page';
import { GenrePage } from './Page-components/genre-page/genre-page';
import { loggedOut, loggedIn } from './core/guards/auth-guard';
import { SeemorePage } from './Page-components/seemore-page/seemore-page';
import { HelpPage } from './Page-components/help-page/help-page';






export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },                              //welcome-each genre still to impelement

    { path: 'welcomepage', component: WelcomePage, title: 'Welcome to Prime', canActivate: [loggedIn] },

    { path: 'home', component: HomePage, title: 'Home', canActivate: [loggedOut] },
    { path: 'login', component: LoginPage, title: 'Login', canActivate: [loggedIn] },
    { path: 'signup', component: SignupPage, title: 'Signup', canActivate: [loggedIn] },
    { path: 'profile', component: ProfilePage, title: 'Profile', canActivate: [loggedOut] },
    { path: 'search', component: SearchPage, title: 'Search', canActivate: [loggedOut] },
    { path: 'genres', component: AllgenresPage, title: 'Genres', canActivate: [loggedOut] },
    { path: 'genres/:id', component: GenrePage, canActivate: [loggedOut] },
    { path: 'movies', component: MoviesPage, title: 'Movies', canActivate: [loggedOut] },
    { path: 'series', component: SeriesPage, title: 'Series', canActivate: [loggedOut] },
    { path: 'movies/player/:id', component: MoviesplayerPage, title: 'MoviesPlayer', canActivate: [loggedOut] },
    { path: 'series/player/:id', component: SeriesplayerPage, title: 'SeriesPlayer', canActivate: [loggedOut] },
    { path: 'watchlist', component: WatchlistPage, title: 'Watchlist', canActivate: [loggedOut] },
    { path: 'browse', component: SeemorePage, title: 'browse', canActivate: [loggedOut] },
    { path: 'help', component: HelpPage, title: 'Help'},

    { path: '**', component: ErrorPage, title: 'Error' }
];
