import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventTypes } from 'src/app/models/event-types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}
  durationInSeconds = 5;
  @Input()
  title!: string;

  @Input()
  message!: string;

  @Input()
  type!: EventTypes;

  ngOnInit(): void {
    const message = `${this.title}: ${this.message}`;
    this.openSnackBar(message, 'close');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
