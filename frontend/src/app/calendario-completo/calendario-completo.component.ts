import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventoDetalle } from '../model/evento.model';
import { EventoService } from '../services/evento.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario-completo',
  standalone: false,
  templateUrl: './calendario-completo.component.html',
  styleUrl: './calendario-completo.component.scss',
})
export class CalendarioCompletoComponent implements OnInit, AfterViewInit {
  //Vista actual
  vistaActual: 'month' | 'week' = 'month';

  //Fecha actual
  fechaActual: Date = new Date();
  anioActual: number = 0;
  mesActual: number = 0;

  //Datos del calendario
  diasDelMes: any[] = [];
  eventosPorDia: Map<string, EventoDetalle[]> = new Map();
  eventosSemana: EventoDetalle[] = [];

  //Eventos seleccionados
  eventosSeleccionados: EventoDetalle[] = [];
  diaSeleccionado: string = '';

  //Estados
  loading: boolean = false;
  mostrarModalEventos: boolean = false;

  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  constructor(
    private eventoService: EventoService,
    private temaService: TemaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.temaService.resetToNeutral();
    this.irAHoy();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    // Forzar detección de cambios después de la vista
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  irAHoy(): void {
    this.fechaActual = new Date();
    this.actualizarFecha();
    this.cargarEventos();
    this.cdr.detectChanges();
  }

  mesAnterior(): void {
    this.fechaActual.setMonth(this.fechaActual.getMonth() - 1);
    this.actualizarFecha();
    this.cargarEventos();
    this.cdr.detectChanges();
  }

  mesSiguiente(): void {
    this.fechaActual.setMonth(this.fechaActual.getMonth() + 1);
    this.actualizarFecha();
    this.cargarEventos();
    this.cdr.detectChanges();
  }

  cambiarVista(vista: 'month' | 'week'): void {
    this.vistaActual = vista;
    if (vista === 'week') {
      this.cargarEventosSemana();
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  private actualizarFecha(): void {
    this.anioActual = this.fechaActual.getFullYear();
    this.mesActual = this.fechaActual.getMonth();
    this.cdr.detectChanges();
  }

  cargarEventos(): void {
    this.loading = true;

    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);

    const fechaInicio = this.formatearFecha(primerDia);
    const fechaFin = this.formatearFecha(ultimoDia);

    this.eventoService.getEventosEntreFechas(fechaInicio, fechaFin).subscribe({
      next: (eventos: EventoDetalle[]) => {
        this.organizarEventosPorDia(eventos);
        this.generarCalendario();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando eventos: ', error);
        this.eventosPorDia.clear();
        this.generarCalendario();
        this.loading = false;
      }
    });
    this.cdr.detectChanges();
  }

  cargarEventosSemana(): void {
    this.loading = true;
    const diasSemana = this.fechaActual.getDay();
    const inicioSemana = new Date(this.fechaActual);
    inicioSemana.setDate(this.fechaActual.getDate() - (diasSemana === 0 ? 6 : diasSemana -1));

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);

    this.eventoService.getEventosEntreFechas(
      this.formatearFecha(inicioSemana),
      this.formatearFecha(finSemana)).subscribe({
        next: (eventos: EventoDetalle[]) => {
          this.eventosSemana = eventos.sort((a, b) =>
          new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando eventos de semana: ', error);
          this.loading = false;
        }
    });
    this.cdr.detectChanges();
  }

  private organizarEventosPorDia(eventos: EventoDetalle[]): void {
    this.eventosPorDia.clear();

    eventos.forEach(evento => {
      const fecha = evento.fecha.split('T')[0];
      if (!this.eventosPorDia.has(fecha)) {
        this.eventosPorDia.set(fecha, []);
      }
      this.eventosPorDia.get(fecha)!.push(evento);
    });
    this.cdr.detectChanges();
  }

  private generarCalendario(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);

    let diaInicio = primerDia.getDay();
    diaInicio = diaInicio === 0 ? 6 : diaInicio - 1;

    this.diasDelMes = [];

    // Días del mes anterior
    const diasMesAnterior = new Date(this.anioActual, this.mesActual, 0).getDate();
    for (let i = diaInicio - 1; i >= 0; i--) {
      const fecha = new Date(this.anioActual, this.mesActual - 1, diasMesAnterior - i);
      this.diasDelMes.push({
        fecha: fecha,
        esMesActual: false,
        eventos: this.eventosPorDia.get(this.formatearFecha(fecha)) || []
      });
      this.cdr.detectChanges();
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const fecha = new Date(this.anioActual, this.mesActual, i);
      this.diasDelMes.push({
        fecha: fecha,
        esMesActual: true,
        esHoy: this.esHoy(fecha),
        eventos: this.eventosPorDia.get(this.formatearFecha(fecha)) || []
      });
      this.cdr.detectChanges();
    }

    // Completar la cuadrícula
    const totalDias = Math.ceil(this.diasDelMes.length / 7) * 7;
    let diaSiguiente = 1;
    while (this.diasDelMes.length < totalDias) {
      const fecha = new Date(this.anioActual, this.mesActual + 1, diaSiguiente++);
      this.diasDelMes.push({
        fecha: fecha,
        esMesActual: false,
        eventos: this.eventosPorDia.get(this.formatearFecha(fecha)) || []
      });
      this.cdr.detectChanges();
    }
  }

  private formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    this.cdr.detectChanges();
    return `${anio}-${mes}-${dia}`;
  }

  private esHoy(fecha: Date): boolean {
    const hoy = new Date();
    this.cdr.detectChanges();
    return fecha.getDate() === hoy.getDate() &&
           fecha.getMonth() === hoy.getMonth() &&
           fecha.getFullYear() === hoy.getFullYear();

  }

  seleccionarDia(dia: any): void {
    this.diaSeleccionado = this.formatearFecha(dia.fecha);
    this.eventosSeleccionados = dia.eventos;
    this.mostrarModalEventos = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarModalEventos = false;
    this.eventosSeleccionados = [];
    this.cdr.detectChanges();
  }

  verEvento(eventoId: number): void {
    this.router.navigate(['/evento', eventoId]);
    this.cdr.detectChanges();
  }

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

  getTipoIcono(tipo: string): string {
    switch (tipo) {
      case 'MITIN': return 'Users';
      case 'RUEDA_PRENSA': return 'Mic2';
      case 'DEBATE': return 'MessageSquare';
      case 'CIERRE_CAMPANA': return 'Flag';
      default: return 'Calendar';
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
    this.cdr.detectChanges();
  }

  semanaAnterior(): void {
    this.fechaActual.setDate(this.fechaActual.getDate() - 7);
    this.actualizarFecha();
    this.cargarEventosSemana();
  }

  semanaSiguiente(): void {
    this.fechaActual.setDate(this.fechaActual.getDate() + 7);
    this.actualizarFecha();
    this.cargarEventosSemana();
  }

  getRangoSemana(): string {
    const diasSemana = this.fechaActual.getDay();
    const inicio = new Date(this.fechaActual);
    inicio.setDate(this.fechaActual.getDate() - (diasSemana === 0 ? 6 : diasSemana - 1));

    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + 6);

    return `${inicio.getDate()} ${this.meses[inicio.getMonth()]} - ${fin.getDate()} ${this.meses[fin.getMonth()]}`;
  }

}
