import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede, SedeMapa } from '../model/sede.model';


@Injectable({
  providedIn: 'root',
})
export class SedeService {

  private apiUrl = 'http://localhost:8080/api/sedes';

  constructor(private http: HttpClient) {}

  getSedesPorParticipacion(partidoEleccionId: number): Observable<SedeMapa[]> {
    return this.http.get<SedeMapa[]>(`${this.apiUrl}/participacion/${partidoEleccionId}`);
  }

  getColegiosElectorales(municipio: string): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/colegios/${municipio}`);
  }

}
