import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleccion } from '../model/eleccion.model';
import { Partido } from '../model/partido.model';
import { Municipio } from '../model/municipio.model';
import { Comunidad } from '../model/comunidad.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';


@Injectable({
  providedIn: 'root',
})
export class EleccionService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getElecciones(): Observable<Eleccion[]> {
    return this.http.get<Eleccion[]>(this.apiUrl);
  }

  getPartidosByEleccion(tipo: string, ambito: string): Observable<PartidoEleccionResumen[]> {
    return this.http.get<PartidoEleccionResumen[]>(`${this.apiUrl}/elecciones/${tipo}/${ambito}/partidos`);
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/municipios`);
  }

  getComunidades(): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(`${this.apiUrl}/comunidades`);
  }

  //Para elección (CRUD - CREATE, READ, UPDATE, DELETE)

  //CRUD (CREAR ELECCIÓN - CREATE) - SOLO ADMINISTRADORES
  crearEleccion(eleccion: any): Observable<Eleccion> {
    return this.http.post<Eleccion>(`${this.apiUrl}/admin`, eleccion);
  }

  //CRUD (BUSCAR LISTAR TODOS LAS ELECCIONES - READ)
  listarTodas(): Observable<Eleccion[]> {
    return this.http.get<Eleccion[]>(`${this.apiUrl}`);
  }

  //CRUD (ACTUALIZAR ELECCIÓN - UPDATE) - SOLO PARA ADMINISTRADORES
  actualizarEleccion(id: number, eleccion: any): Observable<Eleccion> {
    return this.http.put<Eleccion>(`${this.apiUrl}/admin/${id}`, eleccion);
  }

  //CRUD (ELIMINAR ELECCIÓN - DELETE)
  eliminarEleccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }

}
