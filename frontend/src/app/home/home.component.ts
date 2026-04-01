import { Component, OnInit } from '@angular/core';
import { Eleccion } from '../model/eleccion.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { EleccionService } from '../services/eleccion.service';
import { PartidoService } from '../services/partido.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';

interface NivelEleccion {
  tipo: string;
  nombre: string;
  icon: string;
  comunidades?: any[];
  municipios?: any[];
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{

  // Niveles de elección
  niveles: NivelEleccion[] = [
    { tipo: 'NACIONAL', nombre: 'Elecciones Nacionales', icon: 'public' },
    { tipo: 'COMUNIDAD', nombre: 'Elecciones Autonómicas', icon: 'account_balance' },
    { tipo: 'MUNICIPAL', nombre: 'Elecciones Municipales', icon: 'location_city' }
  ];

  nivelSeleccionado: string = '';
  comunidadSeleccionada: any = null;
  municipioSeleccionado: any = null;

  // Datos dinámicos
  comunidades: any[] = [];
  municipios: any[] = [];
  partidos: PartidoEleccionResumen[] = [];
  eventos: any[] = [];
  resultados: any[] = [];

  // Estados
  loading = false;
  mostrarSelectorComunidad = false;
  mostrarSelectorMunicipio = false;

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

  // Estado
  municipioActual: string = '';

  constructor(
    private eleccionService: EleccionService,
    private partidoService: PartidoService,
    private temaService: TemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.temaService.resetToNeutral();
    this.cargarComunidades();
    this.cargarElecciones();
    this.cargarEventosRecientes();
  }

  cargarComunidades(): void {
    // TODO: Cargar desde backend
    this.comunidades = [
      { id: 1, nombre: 'Andalucía', colorPrimario: '#008000', colorSecundario: '#FFFFFF' },
      { id: 2, nombre: 'Aragón', colorPrimario: '#ED1C24', colorSecundario: '#FFD700' },
      { id: 3, nombre: 'Asturias', colorPrimario: '#4B0082', colorSecundario: '#FFD700' },
      { id: 4, nombre: 'Baleares', colorPrimario: '#0066CC', colorSecundario: '#FFD700' },
      { id: 5, nombre: 'Canarias', colorPrimario: '#003366', colorSecundario: '#FFFFFF' },
      { id: 6, nombre: 'Cantabria', colorPrimario: '#E63946', colorSecundario: '#FFD700' },
      { id: 7, nombre: 'Castilla-La Mancha', colorPrimario: '#800000', colorSecundario: '#FFD700' },
      { id: 8, nombre: 'Castilla y León', colorPrimario: '#800000', colorSecundario: '#FFD700' },
      { id: 9, nombre: 'Cataluña', colorPrimario: '#FFD700', colorSecundario: '#ED1C24' },
      { id: 10, nombre: 'Ceuta', colorPrimario: '#0066CC', colorSecundario: '#FFFFFF' },
      { id: 11, nombre: 'Extremadura', colorPrimario: '#008000', colorSecundario: '#000000' },
      { id: 12, nombre: 'Galicia', colorPrimario: '#003366', colorSecundario: '#FFFFFF' },
      { id: 13, nombre: 'La Rioja', colorPrimario: '#ED1C24', colorSecundario: '#FFD700' },
      { id: 14, nombre: 'Madrid', colorPrimario: '#ED1C24', colorSecundario: '#FFFFFF' },
      { id: 15, nombre: 'Melilla', colorPrimario: '#0066CC', colorSecundario: '#FFFFFF' },
      { id: 16, nombre: 'Murcia', colorPrimario: '#ED1C24', colorSecundario: '#FFFFFF' },
      { id: 17, nombre: 'Navarra', colorPrimario: '#008000', colorSecundario: '#FFD700' },
      { id: 18, nombre: 'País Vasco', colorPrimario: '#ED1C24', colorSecundario: '#008000' },
      { id: 19, nombre: 'Valencia', colorPrimario: '#FFD700', colorSecundario: '#ED1C24' }
    ];
  }

  cargarMunicipios(comunidadId: number): void {
    // TODO: Cargar municipios desde backend
    this.municipios = [
      { id: 1, nombre: 'Oviedo', lat: 43.3619, lng: -5.8494 },
      { id: 2, nombre: 'Gijón', lat: 43.5357, lng: -5.6615 },
      { id: 3, nombre: 'Avilés', lat: 43.5567, lng: -5.925 },
      { id: 4, nombre: 'Mieres', lat: 43.25, lng: -5.7667 }
    ];
  }

  onNivelChange(tipo: string): void {
    this.nivelSeleccionado = tipo;
    this.comunidadSeleccionada = null;
    this.municipioSeleccionado = null;
    this.mostrarSelectorComunidad = tipo === 'COMUNIDAD' || tipo === 'MUNICIPAL';
    this.mostrarSelectorMunicipio = false;
    this.partidos = [];

    if (tipo === 'NACIONAL') {
      this.cargarTemaNacional();
      this.cargarPartidosNacionales();
    }
  }

  onComunidadChange(comunidad: any): void {
    this.comunidadSeleccionada = comunidad;
    this.municipioSeleccionado = null;
    this.mostrarSelectorMunicipio = true;

    // Cambiar tema al color de la comunidad
    this.temaService.setTema({
      colorPrincipal: comunidad.colorPrimario,
      colorSecundario: comunidad.colorSecundario,
      colorAcento: comunidad.colorSecundario,
      colorFondo: '#FFFDF7',
      tipo: 'COMUNIDAD',
      nombre: comunidad.nombre
    });

    if (this.nivelSeleccionado === 'MUNICIPAL') {
      this.cargarMunicipios(comunidad.id);
    } else {
      this.cargarPartidosComunidad(comunidad.id);
    }
  }

  onMunicipioChange(municipio: any): void {
    this.municipioSeleccionado = municipio;
    // Cambiar tema al color del municipio
  this.temaService.setTema({
    colorPrincipal: municipio.colorPrimario || '#00236C',
    colorSecundario: municipio.colorSecundario || '#1985FF',
    colorAcento: municipio.colorSecundario || '#1985FF',
    colorFondo: '#FFFDF7',
    tipo: 'MUNICIPIO',
    nombre: municipio.nombre
  });
    this.cargarPartidosMunicipio(municipio.id);
  }

  cargarTemaNacional(): void {
    this.temaService.cargarTemaNacional().subscribe();
  }

  cargarTemaMunicipio(municipioId: number): void {
    this.temaService.cargarTemaMunicipio(municipioId).subscribe();
  }

  cargarPartidosNacionales(): void {
    this.loading = true;
    this.partidoService.getParticipacionesPorEleccion(1).subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cargarPartidosComunidad(comunidadId: number): void {
    this.loading = true;
    // TODO: Endpoint específico
    setTimeout(() => {
      this.partidos = [];
      this.loading = false;
    }, 500);
  }

  cargarPartidosMunicipio(municipioId: number): void {
    this.loading = true;
    // TODO: Endpoint específico
    setTimeout(() => {
      this.partidos = [];
      this.loading = false;
    }, 500);
  }

  cargarEventosRecientes(): void {
    // Cargar últimos 5 eventos
    this.eventos = [
      { id: 1, titulo: 'Debate electoral nacional', fecha: '2024-05-15', tipo: 'NACIONAL', lugar: 'Madrid' },
      { id: 2, titulo: 'Campaña autonómica en Asturias', fecha: '2024-05-10', tipo: 'COMUNIDAD', lugar: 'Oviedo' },
      { id: 3, titulo: 'Presentación de programa municipal', fecha: '2024-05-05', tipo: 'MUNICIPAL', lugar: 'Gijón' },
      { id: 4, titulo: 'Rueda de prensa nacional', fecha: '2024-05-01', tipo: 'NACIONAL', lugar: 'Madrid' },
      { id: 5, titulo: 'Mitin en Avilés', fecha: '2024-04-28', tipo: 'MUNICIPAL', lugar: 'Avilés' }
    ];
  }

  verPartido(partidoId: number): void {
    this.router.navigate(['/partido', partidoId]);
  }

  verEvento(eventoId: number): void {
    console.log('Ver evento:', eventoId);
  }

  zoomIn(): void {
    console.log('Zoom in');
  }

  zoomOut(): void {
    console.log('Zoom out');
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

  verMesas(): void {
    alert('Funcionalidad de mesas electorales - Próximamente');
  }

  verCenso(): void {
    alert('Funcionalidad de censo electoral - Próximamente');
  }
}
