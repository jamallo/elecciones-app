import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const gtag: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  private measurementId = 'G-390895401';

  constructor(private router: Router) {
    this.loadAnalyticsScript();
    this.trackPageViews();
  }

  private loadAnalyticsScript():  void {
    // Cargar script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Inicializar gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtagFn = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    gtagFn('js', new Date());
    gtagFn('config', this.measurementId);
  }

  private trackPageViews(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (typeof gtag !== 'undefined') {
        gtag('config', this.measurementId, {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  // Eventos personalizados
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Eventos específicos de la aplicación
  trackSearch(termino: string, resultados: number): void {
    this.trackEvent('search', 'engagement', termino, resultados);
  }

  trackPartidoClick(partidoId: number, partidoNombre: string): void {
    this.trackEvent('view_partido', 'engagement', partidoNombre, partidoId);
  }

  trackCandidatoClick(candidatoId: number, candidatoNombre: string): void {
    this.trackEvent('view_candidato', 'engagement', candidatoNombre, candidatoId);
  }

  trackEventoClick(eventoId: number, eventoTitulo: string): void {
    this.trackEvent('view_evento', 'engagement', eventoTitulo, eventoId);
  }

  trackLogin(): void {
    this.trackEvent('login', 'conversion', 'user_login');
  }

  trackRegistro(): void {
    this.trackEvent('registro', 'conversion', 'user_registration');
  }

  trackShare(platform: string, content: string): void {
    this.trackEvent('share', 'engagement', `${platform}:${content}`);
  }

}
