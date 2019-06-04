import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router'
import { UserApiService } from "../../core/services/user-api.service";
import { User } from "../../shared/models/user";
import { AlertService } from '../../shared/notifications/alert.service'
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  email: string;
  @Output() termToSearch = new EventEmitter();

  constructor(private authService: AuthService, private router: Router, private userApiService: UserApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.userApiService.getUserById(sessionStorage.getItem('userId')).subscribe((user: User) => this.email = user.email);
  }

  onClickLogOut() {
    this.authService.logOut().then(() => {
      this.alertService.showGoodByeMessage();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    })
  }

  updateTermToSearch(term: string){
    if(!term){
      this.termToSearch.emit(term);
    }
  }

}
