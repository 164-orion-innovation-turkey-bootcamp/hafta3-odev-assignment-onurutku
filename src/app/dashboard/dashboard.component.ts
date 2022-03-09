import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { User } from '../user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  sayHi: User;
  sub: Subscription;
  constructor(private app: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = JSON.parse(localStorage.getItem('user'));
    this.sub = this.app.getLoggedUser(id).subscribe((userLoggedIn) => {
      this.sayHi = userLoggedIn.user;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
