import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  tipo: string;
  partidoId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  private apiUrl = 'http://localhost:8080/api/sedes';

  constructor(private http: HttpClient) {}

  getSedesByMunicipio(municipio: string): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/municipio/${municipio}`);
  }

  getColegiosElectorales(municipio: string): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/colegios/${municipio}`);
  }

}
