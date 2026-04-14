import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  private defaultTitle = 'InfoPartidos - Información Electoral';
  private defaultDescription = 'Consulta toda la información sobre las próximas elecciones: partidos, candidatos, programas, eventos y resultados electorales';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  setTitle(title: string): void {
    const fullTitle = `${title} | Elecciones`;
    this.titleService.setTitle(fullTitle);
    this.updateMeta('og:title', fullTitle);
    this.updateMeta('twitter:title', fullTitle);
  }

  setDescription(description: string): void {
    this.updateMeta('description', description);
    this.updateMeta('og:description', description);
    this.updateMeta('twitter:description', description);
  }

  setImage(imageUrl: string): void {
    this.updateMeta('og:image', imageUrl);
    this.updateMeta('twitter:image', imageUrl);
  }

  setUrl(url: string): void {
    this.updateMeta('og:url', url);
  }

  setType(type: 'website' | 'article'): void {
    this.updateMeta('og:type', type);
  }

  setTwitterCard(card: 'summary' | 'summary_large_image'): void {
    this.updateMeta('twitter:card', card);
  }

  private updateMeta(name: string, content: string): void {
    this.metaService.updateTag({ name, content });

    if (name.startsWith('og:')) {
      this.metaService.updateTag({ property: name, content });
    }
  }

  resetToDefault(): void {
    this.titleService.setTitle(this.defaultTitle);
    this.metaService.updateTag({ name: 'description', content: this.defaultDescription });
    this.metaService.updateTag({ property: 'og:title', content: this.defaultTitle });
    this.metaService.updateTag({ property: 'og:description', content: this.defaultDescription });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  // SEO para páginas específicas
  setHomeSeo(): void {
    this.setTitle('Inicio');
    this.setDescription('Consulta toda la información electoral: partidos, candidatos, eventos y resultados.');
    this.setType('website');
    this.setTwitterCard('summary_large_image');
  }

  setPartidoSeo(nombre: string, siglas: string, ambito: string): void {
    this.setTitle(`${nombre} (${siglas}) - ${ambito}`);
    this.setDescription(`Consulta el programa electoral, candidatos y eventos de ${nombre} (${siglas}) para las próximas elecciones en ${ambito}.`);
    this.setType('article');
    this.setTwitterCard('summary_large_image');
  }

  setCandidatoSeo(nombre: string, partido: string, cargo: string): void {
    this.setTitle(`${nombre} - ${cargo}`);
    this.setDescription(`Conoce la biografía, trayectoria y propuestas de ${nombre}, candidato/a a ${cargo} por ${partido}.`);
    this.setType('article');
    this.setTwitterCard('summary_large_image');
  }

  setResultadosSeo(tipo: string, ambito: string, anio: number): void {
    this.setTitle(`Resultados electorales - ${tipo} ${ambito} ${anio}`);
    this.setDescription(`Consulta los resultados detallados de las elecciones ${tipo} en ${ambito} del año ${anio}. Gráficos, tablas y comparativas.`);
    this.setType('website');
    this.setTwitterCard('summary_large_image');
  }

}
