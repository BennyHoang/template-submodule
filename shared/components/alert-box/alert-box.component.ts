import { Component, Input, OnInit } from '@angular/core';
import { IAlertBox } from 'src/app/models/alertBox';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
})
export class AlertBoxComponent implements OnInit {
  @Input()
  alert: IAlertBox;
  constructor() {}

  ngOnInit(): void {}
}
