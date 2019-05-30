import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClickLogOut(){
    this.authService.logOut().then(() => {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Come Back Again :('
      });

      this.router.navigate(['/login']);
    })
  }

}
