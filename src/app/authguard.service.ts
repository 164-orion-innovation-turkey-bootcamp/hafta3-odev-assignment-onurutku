import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  control: any;
  local: any;
  constructor(private app: AppService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      if (JSON.parse(localStorage.getItem('user')) == route.params.id) {
        return true;
      } else {
        this.router.navigate([
          '/dashboard',
          JSON.parse(localStorage.getItem('user')),
        ]);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }
}
