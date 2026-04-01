import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidoDetalleComponent } from '../partido-detalle/partido-detalle.component';
import { Candidato } from '../model/candidato.model';
import { InformacionPartido, Partido, PartidoDetalle, PartidoResumen } from '../model/partido.model';
import { PartidoEleccion, PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { Evento } from '../model/evento.model';

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

  //Para partidos (CRUD - CREATE, READ, UPDATE, DELETE)

  //CRUD (CREAR PARTIDO - CREATE) - SOLO ADMINISTRADORES
  crearPartido(partido: any): Observable<Partido> {
    return this.http.post<Partido>(`${this.apiUrl}/admin`, partido);
  }

  //CRUD (BUSCAR LISTAR TODOS LOS PARTIDOS - READ)
  listarTodos(): Observable<PartidoDetalle[]> {
    return this.http.get<PartidoResumen[]>(`${this.apiUrl}`);
  }

  //CRUD (BUSCAR PARTIDO - READ)
  obtenerPorId(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.apiUrl}/${id}`);
  }

  //CRUD (ACTUALIZAR PARTIDO - UPDATE) - SOLO PARA ADMINISTRADORES
  actualizarPartido(id: number, partido: any): Observable<Partido> {
    return this.http.put<Partido>(`${this.apiUrl}/admin/${id}`, partido);
  }

  //CRUD (ELIMINAR PARTIDO - DELETE)
  eliminarPartido(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }
}

  /* //CANDIDATOS
  getCandidatos(id: number): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/${id}/candidatos`);
  }

  getInformacion(id: number): Observable<InformacionPartido> {
    return this.http.get<InformacionPartido>(`${this.apiUrl}/${id}/informacion`);
  } */


