import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-candidate-navbar',
  templateUrl: './candidate-navbar.component.html',
  styleUrls: ['./candidate-navbar.component.scss']
})
export class CandidateNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClickLogOut() {
    this.authService.logOut().then(() => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
