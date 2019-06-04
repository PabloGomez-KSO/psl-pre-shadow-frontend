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
  ) {}
 
  onLogIn() {
    this.alertNotification.showLoadingInfoMessageLogin();
    this.authService
      .logIn(this.email, this.password)
      .then(data => this.callUserApiServiceToGetUser(data['user'].uid))
      .catch(() => {
        this.alertNotification.showInvalidCredentialsMessage();
      });
  }
  

  callUserApiServiceToGetUser(userId: string){
    this.userApiService.getUserById(userId).subscribe((user: User) => {
      if (user) { //[To Study ] Function.
        this.alertNotification.closeNotification();
        localStorage.setItem('userId', userId); // [To Study] SessionStorage.
        if (user.roles.admin) {
          this.alertNotification.showSuccessMessage(`Welcome Admin: ${user.name} to the Pre Shadow Platform`);
          localStorage.setItem('rol','Admin');
          this.redirectToAdmin();
        } else if (user.roles.candidate) {
          this.alertNotification.showSuccessMessage(`Welcome ${user.name} to the Pre Shadow Program, We hope you learn a lot`);
          localStorage.setItem('rol','Candidate');
          this.redirectToCandidate();
        }
      } else {
        this.alertNotification.closeNotification();
      }
    });


  }

  redirectToAdmin() {
    this.router.navigate(["/admin-dashboard"]);
  }

  redirectToCandidate(){
    this.router.navigate(["/candidate_dashboard"]);
  }
}
