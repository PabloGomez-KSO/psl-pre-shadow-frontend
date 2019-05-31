import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { UserApiService } from "../../core/services/user-api.service";
import { User } from "../../shared/models/user";
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  email: string;

  constructor(private authService: AuthService, private router: Router, private userApiService: UserApiService) { }

  ngOnInit() {
    this.userApiService.getUserById(localStorage.getItem('userId')).subscribe((user: User) => {
      this.email = user.email;
    });
  }

  onClickLogOut(){
    this.authService.logOut().then(() => {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Goodbye my friend'
      });
      localStorage.removeItem('rol');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
    })
  }

}
