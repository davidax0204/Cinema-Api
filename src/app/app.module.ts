import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from 'src/services/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGaurd } from './auth.guard';
import { AdminService } from 'src/services/admin.service';
import { MovieService } from 'src/services/movie.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEditAdminComponent } from './user-edit-admin/user-edit-admin.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AdminCreateMovieComponent } from './admin-create-movie/admin-create-movie.component';
import { AdminDashboardMoviesComponent } from './admin-dashboard-movies/admin-dashboard-movies.component';
import { MovieEditAdminComponent } from './movie-edit-admin/movie-edit-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    HomeComponent,
    UserComponent,
    SignInComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    UserEditAdminComponent,
    MovieListComponent,
    AdminCreateMovieComponent,
    AdminDashboardMoviesComponent,
    MovieEditAdminComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, AdminService, AuthGaurd, MovieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
