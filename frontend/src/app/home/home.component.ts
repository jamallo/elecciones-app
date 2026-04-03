import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Eleccion } from '../model/eleccion.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { EleccionService } from '../services/eleccion.service';
import { PartidoService } from '../services/partido.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';
import { Municipio } from '../model/municipio.model';
import { Comunidad as ComunidadModel } from '../model/comunidad.model';
import { LucideAngularModule, AlertCircle, RefreshCw } from 'lucide-angular';

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
  comunidadSeleccionada: ComunidadModel | null = null;
  municipioSeleccionado: Municipio | null = null;

  // Datos dinámicos
  elecciones: Eleccion[] = [];
  comunidades: ComunidadModel[] = [];
  municipios: Municipio[] = [];
  partidos: PartidoEleccionResumen[] = [];
  eventos: any[] = [];
  resultados: any[] = [];

  // Estados
  loading = false;
  mostrarSelectorComunidad = false;
  mostrarSelectorMunicipio = false;

  // Lista de elecciones disponibles
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.temaService.resetToNeutral();
    this.cargarComunidades();
    this.cargarElecciones();
    this.cargarEventosRecientes();
  }

  cargarComunidades(): void {
    this.eleccionService.getComunidades().subscribe({
      next: (comunidades) => {
        console.log('Comunidades cargadas: ', comunidades);
        this.comunidades = comunidades;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando comunidades: ', error);
        // Datos de ejemplo por si falla el backend
      this.comunidades = [
        { id: 1, nombre: 'Andalucía', capital: 'Sevilla', colorPrimario: '#008000', colorSecundario: '#FFFFFF', colorAcento: '#FFD700', colorFondo: '#F0F7F0' },
        { id: 2, nombre: 'Asturias', capital: 'Oviedo', colorPrimario: '#4B0082', colorSecundario: '#FFD700', colorAcento: '#9B59B6', colorFondo: '#F5F0FF' },
        { id: 3, nombre: 'Madrid', capital: 'Madrid', colorPrimario: '#ED1C24', colorSecundario: '#FFFFFF', colorAcento: '#FF6B6B', colorFondo: '#FFF0F0' }
      ];
      }
    });
  }

  cargarMunicipios(comunidadNombre: string): void {
    this.loading = true;
    this.eleccionService.getMunicipiosByComunidad(comunidadNombre).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando municipios:', error);
        this.loading = false;
      }
    });
  }


  onNivelChange(tipo: string): void {
    this.nivelSeleccionado = tipo;
    this.comunidadSeleccionada = null;
    this.municipioSeleccionado = null;
    this.mostrarSelectorComunidad = tipo !== 'NACIONAL';
    this.mostrarSelectorMunicipio = false;
    this.partidos = [];
    this.cdr.detectChanges();

    console.log('Nivel seleccionado: ', tipo);
    console.log('Mostrar selector comunidad: ', this.mostrarSelectorComunidad);

    if (tipo === 'NACIONAL') {
      this.cargarPartidosNacionales();
      //Canbiar tema a colores España
      //this.cargarTemaNacional();
      this.temaService.setTema({
        colorPrincipal: '#C0392B',
      colorSecundario: '#F1C40F',
      colorAcento: '#E67E22',
      colorFondo: '#FFF8F0',
      tipo: 'NACIONAL',
      nombre: 'España'
      });
      this.cdr.detectChanges();
    }
  }

  onComunidadChange(comunidad: ComunidadModel): void {
    this.comunidadSeleccionada = comunidad;
    this.municipioSeleccionado = null;
    this.mostrarSelectorMunicipio = this.nivelSeleccionado === 'MUNICIPAL';
    this.cdr.detectChanges();

    // Cambiar tema al color de la comunidad
    this.temaService.setTema({
      colorPrincipal: comunidad.colorPrimario,
      colorSecundario: comunidad.colorSecundario,
      colorAcento: comunidad.colorAcento || comunidad.colorSecundario,
      colorFondo: comunidad.colorFondo || '#FFFDF7',
      tipo: 'COMUNIDAD',
      nombre: comunidad.nombre
    });
    this.cdr.detectChanges();

    if (this.nivelSeleccionado === 'MUNICIPAL') {
      this.cargarMunicipios(comunidad.nombre);
    } else {
      this.cargarPartidosComunidad(comunidad.nombre);
    }
    this.cdr.detectChanges();
  }

  onMunicipioChange(municipio: Municipio): void {
    this.municipioSeleccionado = municipio;
    // Cambiar tema al color del municipio
  this.temaService.setTema({
    colorPrincipal: municipio.colorPrimario || '#00236C',
    colorSecundario: municipio.colorSecundario || '#1985FF',
    colorAcento: municipio.colorAcento || '#1985FF',
    colorFondo: municipio.colorFondo || '#FFFDF7',
    tipo: 'MUNICIPIO',
    nombre: municipio.nombre
  });
    this.cargarPartidosMunicipio(municipio.id);
    this.cdr.detectChanges();
  }

  cargarTemaNacional(): void {
    this.temaService.cargarTemaNacional().subscribe();
    this.cdr.detectChanges();
  }

  cargarTemaMunicipio(municipioId: number): void {
    this.temaService.cargarTemaMunicipio(municipioId).subscribe();
    this.cdr.detectChanges();
  }

  cargarPartidosNacionales(): void {
    console.log('=== CARGANDO PARTIDOS NACIONALES ===');
    console.log('Elecciones disponibles:', this.elecciones);

    //Buscar la elección nacional
    const eleccionNacional = this.elecciones.find(e => e.tipo === 'NACIONAL' && e.ambito === 'España');

    //FORZAR DETECCIÓN DE CAMBIOS
    this.cdr.detectChanges();

    console.log('Elección nacional encontrada: ', eleccionNacional);

    if(!eleccionNacional) {
      console.error('No se encontró la elecció nacional');
      //Intentar con ID 1 como fallback
      console.log('Intentando con ID 1...')
      this.cargarPartidosPorId(1);
      return;
    }
    this.cargarPartidosPorId(eleccionNacional.id)
    this.cdr.detectChanges();
    /* this.loading = true;
    this.partidoService.getParticipacionesPorEleccion(eleccionNacional!.id).subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.loading = false;
      },
      error: () => this.loading = false
    }); */
  }

  cargarPartidosPorId(eleccionId: number): void {
  console.log('Cargando partidos para elección ID:', eleccionId);
  this.loading = true;
  this.partidoService.getParticipacionesPorEleccion(eleccionId).subscribe({
    next: (partidos) => {
      console.log('Partidos recibidos del backend:', partidos);
      this.partidos = partidos;

      //FORZAR DETECCIÓN DE CAMBIOS
      this.cdr.detectChanges();
      this.loading = false;
    },
    error: (error) => {
      console.error('Error cargando partidos:', error);
      // Si hay error, cargar datos de ejemplo para mostrar algo
      this.partidos = this.getPartidosEjemplo();
      this.loading = false;
    }
  });
}

getPartidosEjemplo(): PartidoEleccionResumen[] {
  return [
    {
      id: 1,
      partidoId: 1,
      partidoNombre: 'Partido Popular',
      partidoSiglas: 'PP',
      partidoLogoUrl: '/assets/partidos/pp.png',
      partidoColorPrimario: '#1E88E5',
      eleccionId: 1,
      eleccionTipo: 'NACIONAL',
      eleccionAmbito: 'España'
    },
    {
      id: 2,
      partidoId: 2,
      partidoNombre: 'Partido Socialista Obrero Español',
      partidoSiglas: 'PSOE',
      partidoLogoUrl: '/assets/partidos/psoe.png',
      partidoColorPrimario: '#E63946',
      eleccionId: 1,
      eleccionTipo: 'NACIONAL',
      eleccionAmbito: 'España'
    },
    {
      id: 3,
      partidoId: 3,
      partidoNombre: 'Vox',
      partidoSiglas: 'VOX',
      partidoLogoUrl: '/assets/partidos/vox.png',
      partidoColorPrimario: '#2E7D32',
      eleccionId: 1,
      eleccionTipo: 'NACIONAL',
      eleccionAmbito: 'España'
    },
    {
      id: 4,
      partidoId: 4,
      partidoNombre: 'Sumar',
      partidoSiglas: 'SUMAR',
      partidoLogoUrl: '/assets/partidos/sumar.png',
      partidoColorPrimario: '#FF9800',
      eleccionId: 1,
      eleccionTipo: 'NACIONAL',
      eleccionAmbito: 'España'
    }
  ];
}

  cargarPartidosComunidad(comunidad: string): void {
    // Buscar la elección autonómica por ID de comunidad
    const eleccionAutonomica = this.elecciones.find(e => e.tipo === 'AUTONOMICA' && e.ambito === this.comunidadSeleccionada?.nombre);

    this.cdr.detectChanges();

    if (!eleccionAutonomica) {
      console.error('No se encontró la elección autonómica');
      return;
    }

    this.loading = true;
    this.eleccionService.getPartidosByEleccion('COMUNIDAD', comunidad).subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando partidos de comunidad: ', error);
        this.loading = false;
      }
    })
    /* setTimeout(() => {
      this.partidos = [];
      this.loading = false;
    }, 500); */
  }

  cargarPartidosMunicipio(municipioId: number): void {
    // Buscar la elección municipal
    const eleccionMunicipal = this.elecciones.find(e => e.tipo === 'MUNICIPAL' && e.ambito === this.municipioSeleccionado?.nombre);

    this.cdr.detectChanges();

    if (!eleccionMunicipal) {
      console.error('No se encontró la elección municipal');
      return;
    }

    this.loading = true;
    this.partidoService.getParticipacionesPorEleccion(eleccionMunicipal.id).subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando partidos de municipio: ', error);
        this.loading = false;
      }
    });
    /* setTimeout(() => {
      this.partidos = [];
      this.loading = false;
    }, 500); */
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
    this.cdr.detectChanges();
  }

  verEvento(eventoId: number): void {
    console.log('Ver evento:', eventoId);
    this.cdr.detectChanges();
  }

  zoomIn(): void {
    console.log('Zoom in');
    this.cdr.detectChanges();
  }

  zoomOut(): void {
    console.log('Zoom out');
    this.cdr.detectChanges();
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
        this.cdr.detectChanges();
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

    this.cdr.detectChanges();

    if (this.eleccionSeleccionada) {
      this.municipioActual = this.eleccionSeleccionada.ambito;
      this.cargarPartidosPorEleccion();
      this.cargarTema();
      this.cargarResultados();
      this.cdr.detectChanges();
    }
  }

  cargarPartidosPorEleccion(): void {
    if (!this.eleccionSeleccionada) return;

    this.cdr.detectChanges();
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

    this.cdr.detectChanges();

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
    this.cdr.detectChanges();
  }

  onAnioChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.anioSeleccionado = Number(select.value);
    this.cargarResultados();
    this.cdr.detectChanges();
  }

  onFechaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaEventos = input.value;
    this.cargarEventos();
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }

  verMesas(): void {
    alert('Funcionalidad de mesas electorales - Próximamente');
  }

  verCenso(): void {
    alert('Funcionalidad de censo electoral - Próximamente');
  }

  handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/partidos/placeholder.png'; // Imagen por defecto
}
}
