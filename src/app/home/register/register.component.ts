import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users = [];
  results = [];
  passwordWarning: string;
  isSubmit: boolean;
  postError: string;
  sent: any;

  checkPasswords: ValidatorFn = (
    registerForm: AbstractControl
  ): ValidationErrors | null => {
    let pass = registerForm.get('password').value;
    let confirmPass = registerForm.get('repassword').value;
    if (pass != confirmPass) {
      this.passwordWarning = "Password doesn't match";
    } else {
      this.passwordWarning = '';
    }
    return pass === confirmPass ? null : { notSame: true };
  };

  checkEmail: ValidatorFn = (
    registerForm: AbstractControl
  ): ValidationErrors | null => {
    let email = registerForm.get('email').value;
    this.results = this.users.map((user) => {
      return user.user.email === email ? { notSame: true } : null;
    });
    this.sent = this.results.find((x) => x?.notSame == true);
    return this.sent == { exist: true } ? this.sent : null;
  };
  constructor(private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.app.getData().subscribe((users) => {
      this.users = users;
    });
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
        ]),
        repassword: new FormControl(null, Validators.required),
      },
      { validators: [this.checkPasswords, this.checkEmail] }
    );
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.get('name').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
      };
      this.app.postUser(user).subscribe(
        (responseData) => {
          this.registerForm.reset();
          this.isSubmit = true;
          this.messageTimer();
          this.routerTimer();
        },
        (error) => {
          this.isSubmit = false;
          this.postError = error.message;
          this.messageTimer();
          this.registerForm.reset();
        }
      );
    }
  }
  messageTimer() {
    setTimeout(() => {
      this.isSubmit = null;
      this.postError = null;
    }, 3000);
  }
  routerTimer() {
    setTimeout(() => {
      this.router.navigate(['home/login']);
    }, 1000);
  }
}
