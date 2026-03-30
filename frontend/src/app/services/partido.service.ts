import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidoDetalleComponent } from '../partido-detalle/partido-detalle.component';
import { Candidato } from '../model/candidato.model';
import { InformacionPartido, Partido, PartidoResumen } from '../model/partido.model';
import { PartidoEleccion, PartidoEleccionResumen } from '../model/partido-eleccion.model';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  private apiUrl = 'http://localhost:8080/api/partidos';

  constructor(private http: HttpClient) {}

  //PARTIDOS
  getPartidos(): Observable<PartidoResumen[]> {
    return this.http.get<PartidoResumen[]>(this.apiUrl);
  }

  getPartido(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.apiUrl}/${id}`);
  }

  //PARTICIPACIONES
  getParticipacionesPorEleccion(eleccionId: number): Observable<PartidoEleccionResumen[]> {
    return this.http.get<PartidoEleccionResumen[]>(`${this.apiUrl}/eleccion/${eleccionId}`);
  }

  getParticipacionesPorTipoAmbito(tipo: string, ambito: string): Observable<PartidoEleccionResumen[]> {
    return this.http.get<PartidoEleccionResumen[]>(`${this.apiUrl}/eleccion/${tipo}/${ambito}`);
  }

  getParticipacionCompleta(partidoEleccionId: number): Observable<PartidoEleccion> {
    return this.http.get<PartidoEleccion>(`${this.apiUrl}/participacion/${partidoEleccionId}`);
  }

  getInformacionParticipacion(partidoEleccionId: number): Observable<InformacionPartido> {
    return this.http.get<InformacionPartido>(`${this.apiUrl}/participacion/${partidoEleccionId}/informacion`);
  }

  /* //CANDIDATOS
  getCandidatos(id: number): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/${id}/candidatos`);
  }

  getInformacion(id: number): Observable<InformacionPartido> {
    return this.http.get<InformacionPartido>(`${this.apiUrl}/${id}/informacion`);
  } */
}
