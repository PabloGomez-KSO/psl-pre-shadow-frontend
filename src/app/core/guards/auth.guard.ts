import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take , tap} from 'rxjs/operators';

import { AngularFireAuth } from  "@angular/fire/auth";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
     private router: Router,
     private firebaseAuth: AngularFireAuth,
     private authService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

     return this.authService.currentUserObservable.pipe(
        take(1),
        map(user => {
            return !!user
        }),
        tap( loggedIn => {
            if (!loggedIn) {
                this.router.navigate(['/login']);
            }
        })
    );
  }
}
