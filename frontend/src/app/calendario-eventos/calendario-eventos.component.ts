import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventoDetalle } from '../model/evento.model';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-calendario-eventos',
  standalone: false,
  templateUrl: './calendario-eventos.component.html',
  styleUrl: './calendario-eventos.component.scss',
})
export class CalendarioEventosComponent implements OnInit, OnChanges{
  @Input() fecha: string = '';
  @Input() municipio: string = 'Oviedo';

  eventos: EventoDetalle[] = [];
  loading: boolean = false;

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    if (this.fecha) {
      this.eventoService.getEventosPorParticipacion;
      this.cdr.detectChanges;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fecha'] && !changes['fecha'].firstChange) {
      this.eventoService.getEventosPorParticipacion;
      this.cdr.detectChanges;
    }
  }

  /* cargarEventos(): void {
    if (!this.fecha) {
      this.eventos = [];
      return;
    }

    this.loading = true;

    // Por ahora datos de ejemplo - cuando tengas endpoint de eventos generales, conectar
    this.eventos = [
      {
        id: 1,
        titulo: 'Mitin del Partido Popular',
        descripcion: 'Presentación de propuestas para las próximas elecciones',
        fecha: this.fecha,
        lugar: 'Plaza Mayor',
        tipo: 'MITIN',
        partidoId: 1,
        partidoNombre: 'Partido Popular',
        partidoSiglas: 'PP',
        partidoLogoUrl: '/assets/partidos/pp.png',
        eleccionTipo: 'MUNICIPAL',
        eleccionAmbito: this.municipio
      },
      {
        id: 2,
        titulo: 'Rueda de prensa del PSOE',
        descripcion: 'Presentación del programa electoral',
        fecha: this.fecha,
        lugar: 'Hotel de la Reconquista',
        tipo: 'RUEDA_PRENSA',
        partidoId: 2,
        partidoNombre: 'Partido Socialista',
        partidoSiglas: 'PSOE',
        partidoLogoUrl: '/assets/partidos/psoe.png',
        eleccionTipo: 'MUNICIPAL',
        eleccionAmbito: this.municipio
      },
      {
        id: 3,
        titulo: 'Debate electoral',
        descripcion: 'Debate entre candidatos a la alcaldía',
        fecha: this.fecha,
        lugar: 'Teatro Campoamor',
        tipo: 'DEBATE',
        partidoId: 0,
        partidoNombre: 'Organización Electoral',
        partidoSiglas: '',
        partidoLogoUrl: '',
        eleccionTipo: 'MUNICIPAL',
        eleccionAmbito: this.municipio
      }
    ];
    this.loading = false;
  } */

  getColorPartido(siglas: string): string {
    const colores: { [key: string]: string } = {
      'PP': '#1E88E5',
      'PSOE': '#E63946',
      'VOX': '#2E7D32',
      'SUMAR': '#FF9800',
      'PODEMOS': '#7B1FA2'
    };
    return colores[siglas] || '#6c757d';
  }
}
