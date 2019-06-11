import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../../shared/services/user-api.service";
import { User } from "../../shared/models/user";
@Component({
  selector: 'app-candidate-information',
  templateUrl: './candidate-information.component.html',
  styleUrls: ['./candidate-information.component.scss']
})
export class CandidateInformationComponent implements OnInit {

  candidate: User;

  constructor(private userApiService: UserApiService) { }

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    this.userApiService.getUserById(userId).subscribe((user: User) => this.candidate = user);
  }

}
