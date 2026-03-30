import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatoDetalle } from '../model/candidato.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatoService {
  private apiUrl = 'http://localhost:8080/api/candidatos';

  constructor(private http: HttpClient) { }

  getCandidatosPorParticipacion(partidoEleccionId: number): Observable<CandidatoDetalle[]> {
    return this.http.get<CandidatoDetalle[]>(`${this.apiUrl}/participacion/${partidoEleccionId}`);
  }

  getCandidato(id: number): Observable<CandidatoDetalle> {
    return this.http.get<CandidatoDetalle>(`${this.apiUrl}/${id}`);
  }
}
