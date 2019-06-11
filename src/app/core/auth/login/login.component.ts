import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserApiService } from '../../../shared/services/user-api.service';
import { User } from '../../../shared/models/user';
import { AlertService } from '../../../shared/notifications/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  onLogIn(): void {
    this.alertNotification.showLoadingInfoMessageLogin();
    this.authService
      .logIn(this.email, this.password)
      .then(data => this.callUserApiServiceToGetUser(data['user'].uid))
      .catch((error) => {
        this.alertNotification.showInvalidMessage(error.message);
      });
  }


  callUserApiServiceToGetUser(userId: string): void {
    this.userApiService.getUserById(userId).subscribe((user: User) => {
      if (user) {
        this.verifyUserRoleToRedirect(user, userId);
      } else {
        this.alertNotification.showInvalidMessage('Invalid credentials');
      }
    });
  }

  verifyUserRoleToRedirect(user: User, userId: string): void {
    sessionStorage.setItem('userId', userId);
    if (user.roles.admin) {
      this.sendMessageAndAssignRole(`Welcome Admin: ${user.name} to the Pre Shadow Platform`, 'admin');
      this.redirectToAdmin();
    } else if (user.roles.candidate) {
      this.sendMessageAndAssignRole(`Welcome ${user.name} to the Pre Shadow Program, We hope you learn a lot`, 'Candidate');
      this.redirectToCandidate();
    }
  }
  sendMessageAndAssignRole(message: string, userRol: string): void {
    this.alertNotification.showSuccessMessage(message);
    sessionStorage.setItem('rol', userRol);
    this.alertNotification.closeNotification();
  }

  redirectToAdmin(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  redirectToCandidate(): void {
    this.router.navigate(['/candidate_dashboard']);
  }
}
