import { Component, OnInit } from '@angular/core';
import { Eleccion } from '../model/eleccion.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { EleccionService } from '../services/eleccion.service';
import { PartidoService } from '../services/partido.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  // Lista de elecciones disponibles
  elecciones: Eleccion[] = [];
  eleccionSeleccionada: Eleccion | null = null;

  // Partidos que participan en la elección seleccionada
  partidosParticipacion: PartidoEleccionResumen[] = [];

  // Resultados anteriores
  aniosAnteriores: number[] = [2023, 2019, 2015];
  anioSeleccionado: number = 2023;
  resultadosActuales: any[] = [];

  // Eventos
  fechaEventos: string = '';
  eventos: any[] = [];

  // Estado
  loading: boolean = false;
  municipioActual: string = '';

  constructor(
    private eleccionService: EleccionService,
    private partidoService: PartidoService,
    private temaService: TemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarElecciones();
  }

  cargarElecciones(): void {
    this.loading = true;
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => {
        this.elecciones = elecciones;
        if (this.elecciones.length > 0) {
          this.eleccionSeleccionada = this.elecciones[0];
          this.municipioActual = this.eleccionSeleccionada.ambito;
          this.cargarPartidosPorEleccion();
          this.cargarTema();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando elecciones:', error);
        this.loading = false;
      }
    });
  }

  onEleccionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const eleccionId = Number(select.value);
    this.eleccionSeleccionada = this.elecciones.find(e => e.id === eleccionId) || null;

    if (this.eleccionSeleccionada) {
      this.municipioActual = this.eleccionSeleccionada.ambito;
      this.cargarPartidosPorEleccion();
      this.cargarTema();
      this.cargarResultados();
    }
  }

  cargarPartidosPorEleccion(): void {
    if (!this.eleccionSeleccionada) return;

    this.loading = true;
    this.partidoService.getParticipacionesPorEleccion(this.eleccionSeleccionada.id).subscribe({
      next: (participaciones) => {
        this.partidosParticipacion = participaciones;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando partidos:', error);
        this.loading = false;
      }
    });
  }

  cargarTema(): void {
    if (!this.eleccionSeleccionada) return;

    const tipo = this.eleccionSeleccionada.tipo;
    const ambito = this.eleccionSeleccionada.ambito;

    if (tipo === 'MUNICIPAL') {
      // Buscar el municipio por nombre (simplificado, idealmente tener ID)
      this.temaService.cargarTemaMunicipio(1).subscribe(); // Temporal
    } else if (tipo === 'AUTONOMICA') {
      this.temaService.cargarTemaComunidad(1).subscribe(); // Temporal
    } else if (tipo === 'NACIONAL') {
      this.temaService.cargarTemaNacional().subscribe();
    }
  }

  cargarResultados(): void {
    // Datos de ejemplo según el año
    if (this.anioSeleccionado === 2023) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 38, votos: 42000 },
        { partido: 'PSOE', porcentaje: 32, votos: 35000 },
        { partido: 'VOX', porcentaje: 15, votos: 16000 },
        { partido: 'SUMAR', porcentaje: 10, votos: 11000 },
        { partido: 'OTROS', porcentaje: 5, votos: 5000 }
      ];
    } else if (this.anioSeleccionado === 2019) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 35, votos: 38000 },
        { partido: 'PSOE', porcentaje: 30, votos: 32000 },
        { partido: 'VOX', porcentaje: 18, votos: 19000 },
        { partido: 'SUMAR', porcentaje: 12, votos: 13000 },
        { partido: 'OTROS', porcentaje: 5, votos: 5000 }
      ];
    } else if (this.anioSeleccionado === 2015) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 40, votos: 43000 },
        { partido: 'PSOE', porcentaje: 35, votos: 37000 },
        { partido: 'VOX', porcentaje: 10, votos: 10000 },
        { partido: 'SUMAR', porcentaje: 10, votos: 10000 },
        { partido: 'OTROS', porcentaje: 5, votos: 5000 }
      ];
    }
  }

  onAnioChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.anioSeleccionado = Number(select.value);
    this.cargarResultados();
  }

  onFechaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaEventos = input.value;
    this.cargarEventos();
  }

  cargarEventos(): void {
    if (this.fechaEventos) {
      this.eventos = [
        { id: 1, descripcion: 'Mitin del Partido Popular en la Plaza Mayor', fecha: this.fechaEventos },
        { id: 2, descripcion: 'Rueda de prensa del PSOE en el Hotel de la Reconquista', fecha: this.fechaEventos },
        { id: 3, descripcion: 'Debate electoral en el Teatro Campoamor', fecha: this.fechaEventos }
      ];
    } else {
      this.eventos = [];
    }
  }

  verPartido(partidoEleccionId: number): void {
    this.router.navigate(['/partido', partidoEleccionId]);
  }

  verMesas(): void {
    alert('Funcionalidad de mesas electorales - Próximamente');
  }

  verCenso(): void {
    alert('Funcionalidad de censo electoral - Próximamente');
  }
}
