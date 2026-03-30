import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoDetalle } from '../model/evento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {

  private apiUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) { }

  getEventosPorParticipacion(partidoEleccionId: number): Observable<EventoDetalle[]> {
    return this.http.get<EventoDetalle[]>(`${this.apiUrl}/participacion/${partidoEleccionId}`);
  }
}
