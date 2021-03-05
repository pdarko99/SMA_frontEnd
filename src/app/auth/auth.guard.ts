import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authservice: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let position: string = route.data['claimType']
    return this.checkLoggedIn(position);
  }

  

  canLoad(route: Route): boolean {
    let position: string = route.data['claimType']
    return this.checkLoggedIn(position)
  }

  checkLoggedIn(position): boolean {
    if(localStorage.getItem('userInfo') && this.authservice.UserObject.position=== position){
      return true
    }
    this.router.navigate(['/login' ]);
    return false;
  }

  
  
}
