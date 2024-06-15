import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  template: `
    <div>
      <h1>An error occurred</h1>
      <p>Sorry, something went wrong.</p>
      <button (click)="goHome()">Go to Home</button>
    </div>
  `,
  styles: [`
    div {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class ErrorPageComponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }
}
