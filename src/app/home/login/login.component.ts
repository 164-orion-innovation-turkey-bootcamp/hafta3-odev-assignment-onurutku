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
import { User } from 'src/app/user.model';

interface Users extends Array<User> {}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  users = [];
  results = [];
  sent: any;
  loading: boolean = false;

  checkEmail: ValidatorFn = (
    loginForm: AbstractControl
  ): ValidationErrors | null => {
    let email = loginForm.get('email').value;
    this.results = this.users.map((user) => {
      return user.user.email === email ? { exist: true } : null;
    });
    this.sent = this.results.find((x) => (x?.exist == true ? true : null));
    return this.sent == { exist: true } ? this.sent : null;
  };

  constructor(private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.app.getData().subscribe((users) => {
      this.users = users;
    });
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
        ]),
      },
      { validators: this.checkEmail }
    );
  }
  onSubmit(): void {
    const userLogin = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.app.getData().subscribe(
      (users) => {
        users.forEach((user) => {
          if (
            user.user.email == userLogin.email &&
            user.user.password == userLogin.password
          ) {
            console.log(user.id)
            this.app.userLoggedIn.next(user.id);
            this.app.user = user;
            localStorage.setItem('user', JSON.stringify(user.id));
            this.loading = true;
            this.app.loading.next(true);
            this.timer(user.id);
          } else {
            this.app.loading.next(true);
            this.loading = true;
            this.timer2();
          }
        });
      },
      (error) => {
        console.log(error.message);
        this.errorMessage = error.message;
      }
    );
  }
  timer(id: any): void {
    setTimeout(() => {
      this.app.loading.next(false);
      this.loading = false;
      this.router.navigate(['/dashboard', id]);
      this.app.blurStatus.next(false);
    }, 1500);
  }
  timer2(): void {
    setTimeout(() => {
      this.app.loading.next(false);
      this.loading = false;
      this.errorMessage = "E-mail address and password doesn't match";
    }, 2000);
  }
}
