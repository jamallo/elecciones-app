import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultadoBusqueda, ResultadosAgrupados, Sugerencia } from '../model/busqueda.model';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscriber, switchMap, takeUntil } from 'rxjs';
import { BusquedaService } from '../services/busqueda.service';
import { Router } from '@angular/router';
import { TemaService } from '../services/tema.service';

@Component({
  selector: 'app-buscador',
  standalone: false,
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss',
})
export class BuscadorComponent implements OnInit, OnDestroy {

  searchControl = new FormControl('');
  resultados: ResultadosAgrupados = { partidos: [], candidatos: [], eventos: [], municipios: [] };
  sugerencias: Sugerencia[] = [];
  mostrando = false;
  loading = false;
  terminoActual = '';
  categoriaActiva: 'todos' | 'partidos' | 'candidatos' | 'eventos' | 'municipios' = 'todos';

  private destroy$ = new Subject<void>();

  constructor(
    private busquedaServicio: BusquedaService,
    private router: Router,
    private temaService: TemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(termino => {
      this.terminoActual = termino || '';
      if (!termino || termino.length < 2) {
        this.resultados = { partidos: [], candidatos: [], eventos: [], municipios: [] };
        this.sugerencias = [];
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.loading = true;
      this.cdr.detectChanges();

      this.busquedaServicio.buscarGlobal(termino).subscribe({
        next: (resultados) => {
          this.resultados = resultados;
          this.generarSugerencias(termino);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public abrir(): void {
    this.mostrando = true;
    this.cdr.detectChanges();
    // Enfocar el input después de abrir
    setTimeout(() => {
      const input = document.querySelector('.buscador-modal input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
  }

  private generarSugerencias(termino: string): void {
    const sugerenciasMap = new Map<string, Sugerencia>();

    this.resultados.partidos.forEach(p => {
      if (!sugerenciasMap.has(p.nombre)) {
        sugerenciasMap.set(p.nombre, { texto: p.nombre, tipo: 'partido', id: p.id });
      }
    });

    this.resultados.candidatos.forEach(c => {
      if (!sugerenciasMap.has(c.nombre)) {
        sugerenciasMap.set(c.nombre, { texto: c.nombre, tipo: 'candidato', id: c.id });
      }
    });

    this.resultados.eventos.forEach(e => {
      if (!sugerenciasMap.has(e.nombre)) {
        sugerenciasMap.set(e.nombre, { texto: e.nombre, tipo: 'evento', id: e.id });
      }
    });

    this.resultados.municipios.forEach(m => {
      if (!sugerenciasMap.has(m.nombre)) {
        sugerenciasMap.set(m.nombre, { texto: m.nombre, tipo: 'municipio', id: m.id });
      }
    });

    this.sugerencias = Array.from(sugerenciasMap.values()).slice(0, 5);
  }

  cerrar(): void {
    this.mostrando = false;
    this.searchControl.setValue('');
    this.categoriaActiva = 'todos';
    this.cdr.detectChanges();
  }

  seleccionarResultado(resultado: ResultadoBusqueda): void {
    this.cerrar();
    let ruta = '';
    switch (resultado.tipo) {
      case 'PARTIDO':
        ruta = `/partido/${resultado.id}`;
        break;
      case 'CANDIDATO':
        ruta = `/candidato/${resultado.id}`;
        break;
      case 'EVENTO':
        ruta = `/evento/${resultado.id}`;
        break;
      case 'MUNICIPIO':
        ruta = `/municipio/${resultado.id}`;
        break;
      default:
        ruta = '/';
    }
    this.router.navigate([ruta]);
  }

  seleccionarSugerencia(sugerencia: Sugerencia): void {
    this.searchControl.setValue(sugerencia.texto);
    this.cdr.detectChanges();
  }

  getTotalResultados(): number {
    return this.resultados.partidos.length +
           this.resultados.candidatos.length +
           this.resultados.eventos.length +
           this.resultados.municipios.length;
  }

  limpiarBusqueda(): void {
    this.searchControl.setValue('');
    this.resultados = { partidos: [], candidatos: [], eventos: [], municipios: [] };
    this.sugerencias = [];
    this.cdr.detectChanges();
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('buscador-overlay')) {
      this.cerrar();
    }
  }

  cambiarCategoria(categoria: 'todos' | 'partidos' | 'candidatos' | 'eventos' | 'municipios'): void {
    this.categoriaActiva = categoria;
    this.cdr.detectChanges();
  }

  getResultadosFiltrados(): ResultadosAgrupados {
    switch (this.categoriaActiva) {
      case 'partidos':
        return { ...this.resultados, candidatos: [], eventos: [], municipios: [] };
      case 'candidatos':
        return { partidos: [], candidatos: this.resultados.candidatos, eventos: [], municipios: [] };
      case 'eventos':
        return { partidos: [], candidatos: [], eventos: this.resultados.eventos, municipios: [] };
      case 'municipios':
        return { partidos: [], candidatos: [], eventos: [], municipios: this.resultados.municipios };
      default:
        return this.resultados;
    }
  }

  getColorPorTipo(tipo: string): string {
    switch (tipo) {
      case 'partido': return '#1E88E5';
      case 'candidato': return '#E63946';
      case 'evento': return '#2E7D32';
      case 'municipio': return '#FF9800';
      default: return '#666';
    }
  }

  getIconoPorTipo(tipo: string): string {
    switch (tipo) {
      case 'partido': return 'Users';
      case 'candidato': return 'User';
      case 'evento': return 'Calendar';
      case 'municipio': return 'Building2';
      default: return 'Search';
    }
  }

}
