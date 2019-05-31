import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {

  email: string;
  password: string;
  user: User;
  candidateForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.setCandidateFormValidators();
    this.user ={
      id: '',
      name: '',
      username: '',
      email: '',
      age: 0,
      startDate: '',
      releaseDate: '',
      preference: '',
      roles: {
        candidate: true
      }
    }
  }

  setCandidateFormValidators(){
    this.candidateForm= new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'age': new FormControl('', [Validators.required, Validators.min(18), Validators.min(65)]),
      'username': new FormControl('', [Validators.required, Validators.min(3)]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'start_date': new FormControl('', [Validators.required]),
      'release_date': new FormControl('', [Validators.required]),
      'preference': new FormControl('', [Validators.required])
    });
  }

  onCreateCandidate() {
    console.log(this.user);
   /* this.authService.registerUser(this.email, this.password)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });*/
  }
}
