import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserTokenService } from '../auth/user-token.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private userTokenService: UserTokenService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    localStorage.setItem('previousUrl', state.url);

    const NBIMRole = this.userTokenService.restrictResourceBasedOnUserRole({
      roles: ['nbim'],
    });

    if (NBIMRole) {
      localStorage.removeItem('previousUrl');
      return true;
    }

    this.router.navigate(['/wrong-role']);
    return false;
  }
}
