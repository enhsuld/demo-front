import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private router :Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    else{
      console.log('You must be logged in');
      this.router.navigate(['login']);
      return false;
    }
  }
}
