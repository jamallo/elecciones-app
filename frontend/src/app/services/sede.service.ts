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

  //PARA SEDE (CRUD - CREATE, READ, UPDATE, DELETE)

  //CRUD (CREAR SEDES - CREATE) - SOLO ADMINISTRADORES
  crearSede(sede: any): Observable<Sede> {
    return this.http.post<Sede>(`${this.apiUrl}/admin`, sede);
  }

  //CRUD (BUSCAR LISTAR TODAS LAS SEDES por partido - READ)
  listarTodas(): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}`)
  }

  //CRUD (ACTUALIZAR SEDE - UPDATE) - SOLO PARA ADMINISTRADORES
  actualizarSede(id: number, sede: any): Observable<Sede> {
    return this.http.put<Sede>(`${this.apiUrl}/admin/${id}`, sede);
  }

  //CRUD (ELIMINAR SEDE - DELETE)
  eliminarSede(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }

}
