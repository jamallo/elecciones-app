import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
