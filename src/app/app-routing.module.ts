import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { AuthGaurd } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEditAdminComponent } from './user-edit-admin/user-edit-admin.component';
import { AdminCreateMovieComponent } from './admin-create-movie/admin-create-movie.component';
import { AdminDashboardMoviesComponent } from './admin-dashboard-movies/admin-dashboard-movies.component';
import { MovieEditAdminComponent } from './movie-edit-admin/movie-edit-admin.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGaurd],
    children: [
      { path: '', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      {
        path: 'profile',
        canActivate: [AuthGaurd],
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  { path: 'admin-edit/:id', component: UserEditAdminComponent },
  { path: 'admin-edit-movie/:id', component: MovieEditAdminComponent },
  { path: 'create-movie', component: AdminCreateMovieComponent },
  { path: 'admin-movies', component: AdminDashboardMoviesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
