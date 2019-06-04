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
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Goodbye my friend'
      });
      sessionStorage.clear();
      this.router.navigate(['/login']);
    })
  }


}
