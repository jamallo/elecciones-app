import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadosEleccion, ResultadosHistorico } from '../model/resultados.model';

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {

  private apiUrl = 'http://localhost:8080/api/resultados';

  constructor(private http: HttpClient) {}

  //Obtener resultados por elección
  getResultadosByEleccion(eleccionId: number): Observable<ResultadosEleccion[]> {
    return this.http.get<ResultadosEleccion[]>(`${this.apiUrl}/eleccion/${eleccionId}`);
  }

  //Obtener resultados históricos de un partido
  getResultadosHistoricosPartido(partidoId: number): Observable<ResultadosHistorico[]> {
    return this.http.get<ResultadosHistorico[]>(`${this.apiUrl}/partido/${partidoId}/historico`);
  }

  //Obtener comparativa entre elecciones
  getComparativaResultados(tipo: string, ambito: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comparativa/${tipo}/${ambito}`);
  }

}
