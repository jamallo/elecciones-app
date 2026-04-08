import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<ThemeMode>('light');
  currentTheme$ = this.currentThemeSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private plataformId: Object) {
    this.isBrowser = isPlatformBrowser(this.plataformId);
    this.loadSavedTheme();
  }

  private loadSavedTheme(): void {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        this.setTheme(savedTheme);
      } else {
        //Detectar preferencias del sistema
        const preferDark = window.matchMedia('(`prefers-color-scheme: dark)').matches;
        this.setTheme(preferDark ? 'dark' : 'light');
      }
    }
  }

  setTheme(theme: ThemeMode): void {
    this.currentThemeSubject.next(theme);
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }

  toggleTheme(): void {
    const current = this.currentThemeSubject.value;
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): ThemeMode {
    return this.currentThemeSubject.value;
  }

}
