import { Component } from '@angular/core';
import { UserApiService } from "../../core/services/user-api.service";
import { User } from "../../shared/models/user";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

  candidates: User[] = [];

  constructor(private userApiService: UserApiService) {
    this.getCandidates();
  }

  getCandidates() {
    this.userApiService.getCandidates().subscribe((candidates: User[]) => this.candidates = candidates);
  }
}
