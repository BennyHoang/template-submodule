import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastEvent } from 'src/app/models/toast-event';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];
  constructor(
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.changeDetectorRef.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.changeDetectorRef.detectChanges();
  }
}
