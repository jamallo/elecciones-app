import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidato, CandidatoDetalle } from '../model/candidato.model';
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

  //Para candidatos (CRUD - CREATE, READ, UPDATE, DELETE)

  //CRUD (CREAR PARTIDO - CREATE) - SOLO ADMINISTRADORES
  crearCandidato(candidato: any): Observable<Candidato> {
    return this.http.post<Candidato>(`${this.apiUrl}/admin`, candidato);
  }

  //CRUD (BUSCAR LISTAR TODOS LOS CANDIDATOS - READ) - SOLO ADMINISTRADORES
  listarTodos(): Observable<CandidatoDetalle[]> {
    return this.http.get<CandidatoDetalle[]>(`${this.apiUrl}/admin`);
  }

  //CRUD (BUSCAR CANDIDATO - READ)
  ObtenerCandidatoPorId(id: number): Observable<CandidatoDetalle> {
    return this.http.get<CandidatoDetalle>(`${this.apiUrl}/${id}`);
  }

  //CRUD (ACTUALIZAR CANDIDATO - UPDATE) - SOLO PARA ADMINISTRADORES
  actualizarCandidato(id: number, candidato: any): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.apiUrl}/admin/${id}`, candidato);
  }

  //CRUD (ELIMINAR PARTIDO - DELETE) - SOLO ADMINISTRACION
  eliminarCandidato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }
}
