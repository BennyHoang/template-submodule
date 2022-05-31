import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toastService: ToastService, private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case 302: {
            return throwError(() => error);
          }
          default: {
            const errorMessage = this.setError(error);
            this.toastService.showErrorToast(
              `Http ${error.status}: `,
              errorMessage
            );
            return throwError(() => errorMessage);
          }
        }
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status !== 0) {
        errorMessage = error.error;
      }
    }
    return errorMessage;
  }
}
