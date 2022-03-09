import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  faWindowClose = faWindowClose;
  children: boolean = false;
  subsForBlur: Subscription;
  subsForSpinner: Subscription;
  loading: boolean = false;

  constructor(private app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.subsForBlur = this.app.blurStatus.subscribe((status) => {
      this.children = status;
    });
    if (
      this.router.url == '/home/login' ||
      this.router.url == '/home/register'
    ) {
      if (localStorage.getItem('user') == null) {
        this.app.blurStatus.next(true);
      } else {
        this.router.navigate(['/dashboard', localStorage.getItem('user')]);
      }
    }
    this.subsForSpinner = this.app.loading.subscribe((status) => {
      this.loading = status;
    });
  }
  ngOnDestroy(): void {
    this.subsForBlur.unsubscribe();
    this.subsForSpinner.unsubscribe();
  }
  changeStatus(): void {
    this.app.blurStatus.next(false);
  }
}
