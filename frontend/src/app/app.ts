import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BuscadorComponent } from './buscador/buscador.component';
import { ThemeService, ThemeMode } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  menuOpen = false;

  @ViewChild(BuscadorComponent) buscadorComponent!: BuscadorComponent;

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  goToHome(): void {
    this.router.navigate(['/']).then(() => {
      // Recargar la página para resetear completamente el estado
      window.location.reload();
    });
  }

  // Método para abrir el buscador
  abrirBuscador(): void {
    if (this.buscadorComponent) {
      this.buscadorComponent.abrir();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
