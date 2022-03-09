import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { User } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCofee = faCoffee;
  userLoggedIn: User;
  id: number;
  sub: Subscription;
  sub2: Subscription;

  constructor(private app: AppService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.id = JSON.parse(localStorage.getItem('user'));
      this.sub = this.app.getLoggedUser(this.id).subscribe((userLoggedIn) => {
        this.userLoggedIn = userLoggedIn.user;
      });
    } else {
      this.sub2 = this.app.userLoggedIn.subscribe((userId?: number) => {
        this.app.getLoggedUser(userId).subscribe((userLogged) => {
          this.userLoggedIn = userLogged.user;
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  sendCondition(bool: boolean): void {
    this.app.blurStatus.next(bool);
  }
  logout(): void {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    this.app.userLoggedIn.next(null);
    localStorage.removeItem('user');
    this.userLoggedIn = null;
  }
}
