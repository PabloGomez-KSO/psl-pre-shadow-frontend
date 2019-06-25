import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserApiService } from '../../shared/services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userApiService: UserApiService
  ) { }

  canActivate(): Observable<boolean> {

    return this.authService.getAuth().pipe(
      take(1),
      map(user => {

        this.userApiService.getUserByEmail(user.email).subscribe(data => console.log(data));


        return !!user;
      }),
      tap(loggedIn => {
        if (!loggedIn || !sessionStorage.getItem('userId')) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
