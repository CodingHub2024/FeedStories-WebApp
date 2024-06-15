import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const router = this.injector.get(Router);

    // Check if the error is an HTTP error
    if (error instanceof HttpErrorResponse) {
      console.error('An HTTP error occurred:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }
    router.navigate(['/error']).then(success => {
      console.log('Navigation to /error successful:', success);
    }).catch(err => {
      console.error('Navigation to /error failed:', err);
    });

  }
}
