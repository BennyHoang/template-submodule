import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  buildNumber: string;

  constructor() {
    this.buildNumber = environment.appBuildTime;
  }

  ngOnInit(): void {}
}
