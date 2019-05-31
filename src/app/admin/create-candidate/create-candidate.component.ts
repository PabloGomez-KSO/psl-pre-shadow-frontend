import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";
import { User } from "../../shared/models/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/notifications/alert.service";

@Component({
  selector: "app-create-candidate",
  templateUrl: "./create-candidate.component.html",
  styleUrls: ["./create-candidate.component.scss"]
})
export class CreateCandidateComponent implements OnInit {
  password: string;
  user: User;
  candidateForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.setCandidateFormValidators();
    this.user = {
      id: "",
      name: "",
      username: "",
      email: "",
      age: 0,
      startDate: "",
      releaseDate: "",
      preference: "",
      roles: {
        candidate: true
      }
    };
  }

  setCandidateFormValidators() {
    this.candidateForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      age: new FormControl("", [Validators.required, Validators.min(18)]),
      username: new FormControl("", [Validators.required, Validators.min(3)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      cpassword: new FormControl(""),
      start_date: new FormControl("", [Validators.required]),
      release_date: new FormControl("", [Validators.required]),
      preference: new FormControl("", [Validators.required])
    });

    this.candidateForm.controls["cpassword"].setValidators([
      Validators.required,
      this.noEqualPasswords.bind(this.candidateForm)
    ]);
  }

  onCreateCandidate() {
    for(let i in this.candidateForm.controls){
      this.candidateForm.controls[i].markAsTouched();
    }
    
    console.log(this.user);
    this.authService
      .registerUser(this.user, this.password)
      .then(() => {
        this.alertService.showSuccessMessage("User succesfully created");
        this.router.navigate(["/admin-dashboard/"]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  goBack() {
    this.router.navigate(["/admin-dashboard/"]);
  }

  noEqualPasswords(control: FormControl): { [s: string]: boolean } {
    let form: any = this;
    if (control.value !== form.controls["password"].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }
}
