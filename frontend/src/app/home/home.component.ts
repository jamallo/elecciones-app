import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EleccionService } from '../services/eleccion.service';
import { TemaService } from '../services/tema.service';
import { Partido } from '../model/partido.model';
import { Municipio } from '../model/municipio.model';
import { Comunidad } from '../model/comunidad.model';

interface EleccionOption {
  tipo: string;
  ambito: string;
  label: string;
  nivel: string;
  id?: number;
  icon?: string;  // ← Añadir icon opcional
}

interface Resultado {
  partido: string;
  porcentaje: number;
  votos: number;
}

interface Evento {
  id: number;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Propiedades para el selector de elecciones
  tiposEleccion: EleccionOption[] = [];
  partidos: Partido[] = [];
  seleccionActual: string = '';
  loadingTema: boolean = false;

  // Propiedades para resultados anteriores
  aniosAnteriores: number[] = [2023, 2019, 2015];
  anioSeleccionado: number = 2019;
  resultadosActuales: Resultado[] = [];

  // Propiedades para eventos
  fechaEventos: string = '';
  eventos: Evento[] = [];

  // Propiedades para mapa
  municipioActual: string = 'Oviedo';

  constructor(
    private eleccionService: EleccionService,
    private temaService: TemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarOpcionesEleccion();
    this.cargarResultados();
    this.cargarEventos();
  }

  cargarOpcionesEleccion(): void {
    // Cargar municipios desde el backend
    this.eleccionService.getMunicipios().subscribe({
      next: (municipios: Municipio[]) => {
        const opcionesMunicipios: EleccionOption[] = municipios.map((m: Municipio) => ({
          tipo: 'MUNICIPAL',
          ambito: m.nombre,
          label: `Municipales - ${m.nombre}`,
          nivel: 'MUNICIPAL',
          id: m.id,
          icon: 'location_city'
        }));

        // Cargar comunidades
        this.eleccionService.getComunidades().subscribe({
          next: (comunidades: Comunidad[]) => {
            const opcionesComunidades: EleccionOption[] = comunidades.map((c: Comunidad) => ({
              tipo: 'AUTONOMICA',
              ambito: c.nombre,
              label: `Autonómicas - ${c.nombre}`,
              nivel: 'AUTONOMICA',
              id: c.id,
              icon: 'account_balance'
            }));

            // Opciones nacionales
            const opcionesNacionales: EleccionOption[] = [
              { tipo: 'NACIONAL', ambito: 'España', label: 'Nacionales - España', nivel: 'NACIONAL', icon: 'public' }
            ];

            this.tiposEleccion = [...opcionesMunicipios, ...opcionesComunidades, ...opcionesNacionales];

            if (this.tiposEleccion.length > 0) {
              this.seleccionActual = `${this.tiposEleccion[0].tipo}|${this.tiposEleccion[0].ambito}`;
              this.onEleccionChange(this.seleccionActual);
            }
          },
          error: (error: any) => {
            console.error('Error cargando comunidades:', error);
            this.cargarOpcionesPorDefecto();
          }
        });
      },
      error: (error: any) => {
        console.error('Error cargando municipios:', error);
        this.cargarOpcionesPorDefecto();
      }
    });
  }

  cargarOpcionesPorDefecto(): void {
    this.tiposEleccion = [
      { tipo: 'MUNICIPAL', ambito: 'Oviedo', label: 'Municipales - Oviedo', nivel: 'MUNICIPAL', id: 1, icon: 'location_city' },
      { tipo: 'AUTONOMICA', ambito: 'Asturias', label: 'Autonómicas - Asturias', nivel: 'AUTONOMICA', id: 1, icon: 'account_balance' },
      { tipo: 'NACIONAL', ambito: 'España', label: 'Nacionales - España', nivel: 'NACIONAL', icon: 'public' }
    ];
    this.seleccionActual = `${this.tiposEleccion[0].tipo}|${this.tiposEleccion[0].ambito}`;
    this.onEleccionChange(this.seleccionActual);
  }

  onEleccionChange(value: string): void {
    this.seleccionActual = value;
    const [tipo, ambito] = value.split('|');
    const opcion = this.tiposEleccion.find(o => o.tipo === tipo && o.ambito === ambito);

    this.municipioActual = ambito;
    this.loadingTema = true;

    // Cargar tema según el nivel
    if (tipo === 'MUNICIPAL' && opcion?.id) {
      this.temaService.cargarTemaMunicipio(opcion.id).subscribe({
        next: () => this.loadingTema = false,
        error: () => this.loadingTema = false
      });
    } else if (tipo === 'AUTONOMICA' && opcion?.id) {
      this.temaService.cargarTemaComunidad(opcion.id).subscribe({
        next: () => this.loadingTema = false,
        error: () => this.loadingTema = false
      });
    } else if (tipo === 'NACIONAL') {
      this.temaService.cargarTemaNacional().subscribe({
        next: () => this.loadingTema = false,
        error: () => this.loadingTema = false
      });
    } else {
      this.loadingTema = false;
    }

    this.cargarPartidos(tipo, ambito);
    this.cargarResultados();
  }

  cargarPartidos(tipo: string, ambito: string): void {
    this.eleccionService.getPartidosByEleccion(tipo, ambito)
      .subscribe({
        next: (partidos: Partido[]) => {
          this.partidos = partidos;
          console.log('Partidos cargados:', partidos);
        },
        error: (error: any) => console.error('Error cargando partidos:', error)
      });
  }

  // Métodos para resultados anteriores
  onAnioChange(valor: string): void {
    this.anioSeleccionado = Number(valor);
    this.cargarResultados();
  }

  cargarResultados(): void {
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

  // Métodos para eventos
  onFechaChange(valor: string): void {
    this.fechaEventos = valor;
    this.cargarEventos();
  }

  cargarEventos(): void {
    if (this.fechaEventos) {
      this.eventos = [
        { id: 1, descripcion: 'Mitin del Partido Popular en la Plaza Mayor', fecha: this.fechaEventos },
        { id: 2, descripcion: 'Rueda de prensa del PSOE en el Hotel de la Reconquista', fecha: this.fechaEventos },
        { id: 3, descripcion: 'Debate electoral en el Teatro Campoamor', fecha: this.fechaEventos },
        { id: 4, descripcion: 'Jornada de puertas abiertas de Vox', fecha: this.fechaEventos }
      ];
    } else {
      this.eventos = [];
    }
  }

  // Métodos para botones de acción
  verMesas(): void {
    console.log('Ver mesas electorales');
    alert('Funcionalidad de mesas electorales - Próximamente');
  }

  verCenso(): void {
    console.log('Ver censo electoral');
    alert('Funcionalidad de censo electoral - Próximamente');
  }

  // Navegación
  verPartido(id: number): void {
    this.router.navigate(['/partido', id]);
  }
}
