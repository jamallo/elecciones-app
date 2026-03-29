import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidoDetalle } from '../partido-detalle/partido-detalle';
import { Candidato } from '../model/candidato';
import { InformacionPartido, Partido } from '../model/partido.model';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  private apiUrl = 'http://localhost:8080/api/partidos';

  constructor(private http: HttpClient) {}

  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }

  getPartido(id: number): Observable<PartidoDetalle> {
    return this.http.get<PartidoDetalle>(`${this.apiUrl}/${id}`);
  }

  getCandidatos(id: number): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/${id}/candidatos`);
  }

  getInformacion(id: number): Observable<InformacionPartido> {
    return this.http.get<InformacionPartido>(`${this.apiUrl}/${id}/informacion`);
  }
}
