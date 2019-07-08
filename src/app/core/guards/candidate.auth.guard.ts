import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCandidate implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {

    const userId = sessionStorage.getItem('userId');
    const rol = sessionStorage.getItem('rol');

    return this.authService.getAuth().pipe(
      take(1),
      map(user => {
        if ( rol === 'admin') {
          return false;
        }
        return !!user;
      }),
      tap(loggedIn => {
        if (!loggedIn || !userId) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
