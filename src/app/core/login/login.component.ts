import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  /*Missing implementation, testing purposes*/
  logIn(){
    this.redirectToAdmin();
  }

  redirectToAdmin(){
    this.router.navigate(['/admin-dashboard']);
  }

}
