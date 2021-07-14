import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/services/user.service';
const db = environment.NODEJS_SERVER;

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private router: Router,
    private UserService: UserService,
    private http: HttpClient
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.http.post(db + '/isLoged', { localStorage }).subscribe(
      (res) => {
        this.router.navigate(['/user/profile']);
      },
      (error) => {
        this.router.navigate(['/user']);
      }
    );
    return true;
  }
}
