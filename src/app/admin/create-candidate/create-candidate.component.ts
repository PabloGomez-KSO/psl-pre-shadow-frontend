import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onCreateCandidate() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
}
