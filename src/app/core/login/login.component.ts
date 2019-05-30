import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  /*Missing implementation, testing purposes*/
  onLogIn() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Loading...'
    });
    Swal.showLoading();

    this.authService.logIn(this.email, this.password).then(
      (data) => {
        console.log(data);
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Welcome to our Pre Shadow Platform'
        });
        this.redirectToAdmin();
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          allowOutsideClick: false,
          type: 'error',
          text: err.message
        });
      });
  }

  redirectToAdmin() {
    this.router.navigate(['/admin-dashboard']);
  }

}
