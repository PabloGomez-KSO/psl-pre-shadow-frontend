import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-candidate-navbar',
  templateUrl: './candidate-navbar.component.html',
  styleUrls: ['./candidate-navbar.component.scss']
})
export class CandidateNavbarComponent  {

  constructor(private authService: AuthService, private router: Router) { }

  onClickLogOut() {
    this.authService.logOut().subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
