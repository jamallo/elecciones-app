import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Tema {
  colorPrincipal: string;
  colorSecundario: string;
  colorAcento: string;
  colorFondo: string;
  tipo:string;
  nombre: string;
  siglas?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private apiUrl = 'http://localhost:8080/api';
  private temaSubject = new BehaviorSubject<Tema>(this.getTemaNeutral());
  tema$ = this.temaSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTemaNeutral(): Tema {
    return {
      colorPrincipal: '#D4AF37',  // Dorado metálico
      colorSecundario: '#C5A028',
      colorAcento: '#E5B83C',
      colorFondo: '#FFFDF7',
      tipo: 'NEUTRAL',
      nombre: 'Elecciones 2027'
    };
  }

  //Obtener tema de un municipio desde BD
  cargarTemaMunicipio(municipioId: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/municipios/${municipioId}/tema`)
    .pipe(tap(tema => this.temaSubject.next(tema)));
  }

  //Obtener tema de un partido desde BD
  cargarTemaPartido(partidoId: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/partidos/${partidoId}/tema`)
    .pipe(tap(tema => this.temaSubject.next(tema)));
  }

  //Obtener tema de una comunidad autónoma
  cargarTemaComunidad(comunidadId: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/comunidades/${comunidadId}/tema`)
    .pipe(tap(tema => this.temaSubject.next(tema)));
  }



  setTema(tema: Tema): void {
    console.log('setTema llamado con:', tema);
    this.temaSubject.next(tema);

    // Aplicar directamente las variables CSS
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', tema.colorPrincipal);
      document.documentElement.style.setProperty('--secondary-color', tema.colorSecundario);
      document.documentElement.style.setProperty('--accent-color', tema.colorAcento);
      document.documentElement.style.setProperty('--bg-color', tema.colorFondo);
      document.documentElement.style.setProperty('--text-color', tema.colorPrincipal);
      document.documentElement.style.setProperty('--header-gradient', `linear-gradient(135deg, ${tema.colorPrincipal}, ${tema.colorSecundario})`);

      console.log('Variables CSS actualizadas:', {
        '--primary-color': tema.colorPrincipal,
        '--secondary-color': tema.colorSecundario,
        '--header-gradient': `linear-gradient(135deg, ${tema.colorPrincipal}, ${tema.colorSecundario})`
      });
    }
  }

  resetToNeutral(): void {
    this.temaSubject.next(this.getTemaNeutral());
  }

  //Tema nacional (España)
  cargarTemaNacional(): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/nacional/tema`)
      .pipe(tap(tema => {
        console.log('Tema nacional cargando: ', tema);
        this.temaSubject.next(tema);
      })
    );
  }
}

