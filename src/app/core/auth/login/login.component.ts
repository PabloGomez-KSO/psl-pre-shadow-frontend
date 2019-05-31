import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserApiService } from '../../services/user-api.service';
import { User } from "../../../shared/models/user";
import { AlertService } from "../../../shared/notifications/alert.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userApiService: UserApiService,
    private alertNotification: AlertService
  ) {}

  ngOnInit() {}

  onLogIn() {
    this.alertNotification.showLoadingInfoMessageLogin();
    this.authService
      .logIn(this.email, this.password)
      .then(data => {
        let userId = data["user"].uid;
        this.userApiService.getUserById(userId).subscribe((user: User) => {
          if (user) {
            this.alertNotification.closeNotification();
            this.alertNotification.showSuccessMessageLogin();
            if (user.roles.admin) {
              this.redirectToAdmin();
            } else if (user.roles.candidate) {
              this.redirectToCandidate();
            }
          } else {
            this.alertNotification.closeNotification();
          }
        });
      })
      .catch(() => {
        this.alertNotification.showInvalidCredentialsMessage();
      });
  }

  redirectToAdmin() {
    this.router.navigate(["/admin-dashboard"]);
  }

  redirectToCandidate(){
    this.router.navigate(["/candidate_dashboard"]);
  }
}
