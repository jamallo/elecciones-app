import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ResultadoBusqueda, ResultadosAgrupados } from '../model/busqueda.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private apiUrl = 'http://localhost:8080/api/busqueda';

  constructor(private http: HttpClient) { }

  buscarGlobal(termino: string): Observable<ResultadosAgrupados> {
    if (!termino || termino.length < 2) {
      return of({ partidos: [], candidatos: [], eventos: [], municipios: [] });
    }

    return this.http.get<any[]>(`${this.apiUrl}?q=${encodeURIComponent(termino)}`).pipe(
      map(resultados => {
        const agrupados: ResultadosAgrupados = {
          partidos: [],
          candidatos: [],
          eventos: [],
          municipios: []
        };

        resultados.forEach(item => {
          const resultado: ResultadoBusqueda = {
            tipo: item.tipo,
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            imagenUrl: item.imagenUrl,
            color: item.color,
            link: item.link,
            subtitulo: item.subtitulo
          };

          switch (item.tipo) {
            case 'PARTIDO':
              agrupados.partidos.push(resultado);
              break;
            case 'CANDIDATO':
              agrupados.candidatos.push(resultado);
              break;
            case 'EVENTO':
              agrupados.eventos.push(resultado);
              break;
            case 'MUNICIPIO':
              agrupados.municipios.push(resultado);
              break;
          }
        });

        return agrupados;
      })
    );
  }

  // Obtener sugerencias para autocompletado
  getSugerencias(termino: string): Observable<string[]> {
    if (!termino || termino.length < 2) {
      return of([]);
    }

    return this.http.get<any[]>(`${this.apiUrl}?q=${encodeURIComponent(termino)}`).pipe(
      map(resultados => {
        const sugerencias: string[] = [];
        resultados.forEach(item => {
          if (!sugerencias.includes(item.nombre)) {
            sugerencias.push(item.nombre);
          }
        });
        return sugerencias.slice(0, 5);
      })
    );
  }
}
/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResultadoBusqueda, ResultadosAgrupados } from '../model/busqueda.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  buscarGlobal(termino: string): Observable<ResultadosAgrupados> {
    if (!termino || termino.length < 2) {
      return new Observable(subscriber => {
        subscriber.next({ partidos: [], candidatos: [], eventos: [], municipios: [] });
        subscriber.complete();
      });
    }

    return this.http.get<any[]>(`${this.apiUrl}/busqueda?q=${encodeURIComponent(termino)}`).pipe(
      map(resultados => {
        const agrupados: ResultadosAgrupados = {
          partidos: [],
          candidatos: [],
          eventos: [],
          municipios: []
        };
        resultados.forEach(item => {
          const resultado: ResultadoBusqueda = {
            tipo: item.tipo,
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            imagenUrl: item.imagenUrl,
            color: item.color,
            link: item.link,
            subtitulo: item.subtitulo
          };

          switch (item.tipo) {
            case 'PARTIDO':
              agrupados.partidos.push(resultado);
              break;
            case 'CANDIDATO':
              agrupados.candidatos.push(resultado);
              break;
            case 'EVENTO':
              agrupados.eventos.push(resultado);
              break;
            case 'MUNICIPIO':
              agrupados.municipios.push(resultado);
              break;
          }
        });
      return agrupados;
      })
    );
  }

  private organizarResultados(data: any): ResultadosAgrupados {
    return {
      partidos: (data.partidos || []).map((p: any) => ({
        tipo: 'PARTIDO',
        id: p.id,
        nombre: p.nombre,
        descripcion: p.siglas,
        imagenUrl: p.logoUrl,
        color: p.colorPrimario,
        link: `/partido/${p.id}`,
        subtitulo: `Partido político`
      })),
      candidatos: (data.candidatos || []).map((c: any) => ({
        tipo: 'CANDIDATO',
        id: c.id,
        nombre: c.nombre,
        descripcion: c.cargo,
        imagenUrl: c.fotoUrl,
        link: `/candidato/${c.id}`,
        subtitulo: `${c.partidoNombre} · ${c.cargo}`
      })),
      eventos: (data.eventos || []).map((e: any) => ({
        tipo: 'EVENTO',
        id: e.id,
        nombre: e.titulo,
        descripcion: e.lugar,
        imagenUrl: e.imagenUrl,
        link: `/evento/${e.id}`,
        subtitulo: `${e.fecha} · ${e.tipo}`
      })),
      municipios: (data.municipios || []).map((m: any) => ({
        tipo: 'MUNICIPIO',
        id: m.id,
        nombre: m.nombre,
        descripcion: m.provincia,
        link: `/municipio/${m.id}`,
        subtitulo: `${m.comunidadAutonoma}`
      }))
    };
  }

}
 */
