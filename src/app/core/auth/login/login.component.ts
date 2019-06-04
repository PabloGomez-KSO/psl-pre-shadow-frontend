import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserApiService } from '../../services/user-api.service';
import { User } from "../../../shared/models/user";
import { AlertService } from "../../../shared/notifications/alert.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userApiService: UserApiService,
    private alertNotification: AlertService
  ) { }

  onLogIn() {
    this.alertNotification.showLoadingInfoMessageLogin();
    this.authService
      .logIn(this.email, this.password)
      .then(data => this.callUserApiServiceToGetUser(data['user'].uid))
      .catch((error) => {
        console.log(error);
        this.alertNotification.showInvalidCredentialsMessage(error.message);
      });
  }

  callUserApiServiceToGetUser(userId: string) {
    this.userApiService.getUserById(userId).subscribe((user: User) => this.verifyUserRoleToRedirect(user, userId));
  }

  verifyUserRoleToRedirect(user: User, userId: string) {
    sessionStorage.setItem('userId', userId);
    if (user.roles.admin) {
      this.alertNotification.showSuccessMessage(`Welcome Admin: ${user.name} to the Pre Shadow Platform`);
      sessionStorage.setItem('rol', 'Admin');
      this.redirectToAdmin();
    } else if (user.roles.candidate) {
      this.alertNotification.showSuccessMessage(`Welcome ${user.name} to the Pre Shadow Program, We hope you learn a lot`);
      sessionStorage.setItem('rol', 'Candidate');
      this.redirectToCandidate();
    }
    this.alertNotification.closeNotification();
  }

  redirectToAdmin() {
    this.router.navigate(["/admin-dashboard"]);
  }

  redirectToCandidate() {
    this.router.navigate(["/candidate_dashboard"]);
  }
}
