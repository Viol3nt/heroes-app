import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verifyAuth().pipe(
      tap((isVerified) => {
        if (!isVerified) this.router.navigate(['./auth/login']);
      })
    );
    // if (this.authService.user.id) return true;

    // console.log('Blocked by CanActivate');
    // return false;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.verifyAuth().pipe(
      tap((isVerified) => {
        if (!isVerified) this.router.navigate(['./auth/login']);
      })
    );
    // if (this.authService.user.id) return true;

    // console.log('Blocked by CanLoad');
    // return false;
  }
}
