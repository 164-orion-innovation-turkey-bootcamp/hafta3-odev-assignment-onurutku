import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('body') body: any;
  title = 'hafta3-onurutku';
  blur: boolean = false;
  subs: Subscription;
  constructor(private app: AppService, private router: Router) {}
  ngOnInit(): void {
    this.subs = this.app.blurStatus.subscribe((status) => {
      this.blur = status;
      if (this.blur) {
        this.body.nativeElement.classList.add('blur');
      } else {
        this.body.nativeElement.classList.remove('blur');
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
