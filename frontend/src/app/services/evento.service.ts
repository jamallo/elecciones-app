import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento, EventoDetalle } from '../model/evento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {

  private apiUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) { }

  // Obtener eventos por tipo y ámbito de elección (devuelve EventoDetalle[])
  getEventosByEleccion(tipo: string, ambito: string): Observable<EventoDetalle[]> {
    return this.http.get<EventoDetalle[]>(`${this.apiUrl}/eleccion/${tipo}/${ambito}`);
  }

  // Obtener últimos 5 eventos generales
  getUltimosEventos(): Observable<EventoDetalle[]> {
    return this.http.get<EventoDetalle[]>(`${this.apiUrl}/ultimos`);
  }

  getEventosPorParticipacion(partidoEleccionId: number): Observable<EventoDetalle[]> {
    return this.http.get<EventoDetalle[]>(`${this.apiUrl}/participacion/${partidoEleccionId}`);
  }

  // Obtener eventos por nivel (NACIONAL, AUTONOMICA, MUNICIPAL)
  getEventosPorNivel(nivel: string, ambito?: string): Observable<Evento[]> {
    let url = `${this.apiUrl}/nivel/${nivel}`;
    if (ambito) {
      url += `?ambito=${ambito}`;
    }
    return this.http.get<Evento[]>(url);
  }

 /*  // Obtener últimos 5 eventos generales
  getUltimosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/ultimos`);
  } */

  // Obtener eventos por comunidad
  getEventosPorComunidad(comunidad: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/comunidad/${comunidad}`);
  }

  // Obtener eventos por municipio
  getEventosPorMunicipio(municipio: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/municipio/${municipio}`);
  }

  //Para eventos (CRUD - CREATE, READ, UPDATE, DELETE)

  //CRUD (CREAR EVENTO - CREATE(POST)) - SOLO ADMINISTRADORES
  crearEvento(evento: any): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/admin`, evento);
  }

  //CRUD (BUSCAR LISTAR TODOS LOS EVENTOS -READ(GET))
  listartodos(): Observable<EventoDetalle[]> {
    return this.http.get<EventoDetalle[]>(`${this.apiUrl}/admin`);
  }

  //CRUD (BUSCAR EVENTO -READ(GET))
  ObtenerEventoPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`)
  }

  //CRUD (ACTUALIZAR EVENTO - UPDATE(PUT)) - SOLO PARA ADMINISTRADORES
  actualizarEvento(id: number, evento: any): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/admin/${id}`, evento);
  }

  //CRUD (ELIMINAR PARTIDO - DELETE)
  eleminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }

}
