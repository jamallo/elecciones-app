import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultadoBusqueda, ResultadosAgrupados } from '../model/busqueda.model';
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
  mostrando = false;
  loading = false;
  terminoActual = '';

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
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.loading = true;
      this.cdr.detectChanges();

      this.busquedaServicio.buscarGlobal(termino).subscribe({
        next: (resultados) => {
          this.resultados = resultados;
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

  cerrar(): void {
    this.mostrando = false;
    this.searchControl.setValue('');
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

  getTotalResultados(): number {
    return this.resultados.partidos.length +
           this.resultados.candidatos.length +
           this.resultados.eventos.length +
           this.resultados.municipios.length;
  }

  limpiarBusqueda(): void {
    this.searchControl.setValue('');
    this.resultados = { partidos: [], candidatos: [], eventos: [], municipios: [] };
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

}
