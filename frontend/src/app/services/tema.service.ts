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
      colorPrincipal: '#00236C',
      colorSecundario: '#1985FF',
      colorAcento: '#6c757d',
      colorFondo: '#FFFFFF',
      tipo: 'NEUTRAL',
      nombre: 'Neutral'
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

  //Tema nacional (España)
  cargarTemaNacional(): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/nacional/tema`)
    .pipe(tap(tema => this.temaSubject.next(tema)));
  }

  setTema(tema: Tema): void {
    this.temaSubject.next(tema);
  }

  resetToNeutral(): void {
    this.temaSubject.next(this.getTemaNeutral());
  }
}
