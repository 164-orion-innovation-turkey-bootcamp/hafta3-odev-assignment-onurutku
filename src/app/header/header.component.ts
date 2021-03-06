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
      this.id = JSON.parse(localStorage.getItem('user'));
      if(this.id){
        this.sub = this.app.getLoggedUser(this.id).subscribe((userLoggedIn) => {
        this.userLoggedIn = userLoggedIn.user;
      });
      }
    this.sub2=this.app.userLoggedIn.subscribe(data=>{
      if(data){
        this.app.getLoggedUser(Number(data)).subscribe(user=>{
        this.userLoggedIn = user.user;
      })
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  sendCondition(bool: boolean): void {
    this.app.blurStatus.next(bool);
  }
  logout(): void {
    this.app.userLoggedIn.next(null);
    this.userLoggedIn=undefined;
    localStorage.removeItem('user');
  }
}
