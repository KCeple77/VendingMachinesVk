import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  showToolbar: boolean = true;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.showToolbar = (event.url !== '/page-not-found');
      }
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  title = 'app';
}
