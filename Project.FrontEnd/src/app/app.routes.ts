import { SeriesplayerPage } from './Page-components/seriesplayer-page/seriesplayer-page';
import { MoviesplayerPage } from './Page-components/moviesplayer-page/moviesplayer-page';
import { SeriesPage } from './Page-components/series-page/series-page';
import { MoviesPage } from './Page-components/movies-page/movies-page';
import { WatchlistPage } from './Page-components/watchlist-page/watchlist-page';
import { SearchPage } from './Page-components/search-page/search-page';
import { ProfilePage } from './Page-components/profile-page/profile-page';
import { SignupPage } from './Page-components/signup-page/signup-pag';
import { LoginPage } from './Page-components/login-page/login-page';
import { ErrorPage } from './Page-components/error-page/error-page';
import { Routes } from '@angular/router';
import { HomePage } from './Page-components/home-page/home-page';
import { AllgenresPage } from './Page-components/allgenres-page/allgenres-page';
import { WelcomePage } from './Page-components/welcome-page/welcome-page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },                              //welcome-each genre still to impelement

    { path: 'w', component: WelcomePage, title: 'Home' },

    { path: 'home', component: HomePage, title: 'Home' },
    { path: 'login', component: LoginPage, title: 'Login' },
    { path: 'signup', component: SignupPage, title: 'Signup' },
    { path: 'profile', component: ProfilePage, title: 'Profile' },
    { path: 'search', component: SearchPage, title: 'Search' },
    { path: 'genres', component: AllgenresPage, title: 'Genres' },
    { path: 'movies', component: MoviesPage, title: 'Movies' },
    { path: 'series', component: SeriesPage, title: 'Series' },
    { path: 'moviesplayer', component: MoviesplayerPage, title: 'MoviesPlayer' },
    { path: 'seriesplayer', component: SeriesplayerPage, title: 'SeriesPlayer' },
    { path: 'watchlist', component: WatchlistPage, title: 'Watchlist' },

    { path: '**', component: ErrorPage, title: 'Error' }
];
