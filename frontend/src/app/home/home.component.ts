import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EleccionService } from '../services/eleccion.service';
import { PartidoService } from '../services/partido.service';
import { TemaService } from '../services/tema.service';
import { EventoService } from '../services/evento.service';
import { Eleccion } from '../model/eleccion.model';
import { PartidoEleccionResumen } from '../model/partido-eleccion.model';
import { Comunidad } from '../model/comunidad.model';
import { Municipio } from '../model/municipio.model';
import { EventoDetalle } from '../model/evento.model';

interface NivelEleccion {
  tipo: string;
  nombre: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // ========== NIVELES DE ELECCIÓN ==========
  niveles: NivelEleccion[] = [
    { tipo: 'NACIONAL', nombre: 'Elecciones Nacionales', icon: 'Globe' },
    { tipo: 'AUTONOMICA', nombre: 'Elecciones Autonómicas', icon: 'Building2' },
    { tipo: 'MUNICIPAL', nombre: 'Elecciones Municipales', icon: 'Building' }
  ];

  nivelSeleccionado: string = '';
  comunidadSeleccionada: Comunidad | null = null;
  municipioSeleccionado: Municipio | null = null;

  // ========== DATOS DINÁMICOS ==========
  elecciones: Eleccion[] = [];
  comunidades: Comunidad[] = [];
  comunidadesFiltradas: Comunidad[] = [];
  municipios: Municipio[] = [];
  municipiosFiltrados: Municipio[] = [];
  partidos: PartidoEleccionResumen[] = [];
  eventos: EventoDetalle[] = [];

  // ========== TEXTO DE BÚSQUEDA ==========
  comunidadSearchText: string = '';
  municipioSearchText: string = '';

  // ========== ESTADOS ==========
  loading: boolean = false;
  mostrarSelectorComunidad: boolean = false;
  mostrarSelectorMunicipio: boolean = false;
  searchText: string = '';

  // ========== RESULTADOS ANTERIORES ==========
  aniosAnteriores: number[] = [2023, 2019, 2015];
  anioSeleccionado: number = 2023;
  resultadosActuales: any[] = [];

  constructor(
    private eleccionService: EleccionService,
    private partidoService: PartidoService,
    private temaService: TemaService,
    private eventoService: EventoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // ========== INICIALIZACIÓN ==========
  ngOnInit(): void {
    this.temaService.resetToNeutral();
    this.cargarElecciones();
    this.cargarComunidades();
    this.cargarUltimosEventos();
  }

  // ========== CARGA DE DATOS ==========
  cargarElecciones(): void {
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => {
        this.elecciones = elecciones;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando elecciones:', error)
    });
  }

  cargarComunidades(): void {
    this.eleccionService.getComunidades().subscribe({
      next: (comunidades) => {
        this.comunidades = comunidades;
        this.comunidadesFiltradas = [...comunidades];
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error cargando comunidades:', error)
    });
  }

  cargarMunicipios(comunidadNombre: string): void {
    this.loading = true;
    this.eleccionService.getMunicipiosByComunidad(comunidadNombre).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.municipiosFiltrados = [...municipios];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando municipios:', error);
        this.municipios = [];
        this.municipiosFiltrados = [];
        this.loading = false;
      }
    });
  }

  cargarUltimosEventos(): void {
    this.eventoService.getUltimosEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando últimos eventos:', error);
        this.cargarEventosPorEleccion('NACIONAL', 'España');
      }
    });
  }

  cargarEventosPorEleccion(tipo: string, ambito: string): void {
    this.eventoService.getEventosByEleccion(tipo, ambito).subscribe({
      next: (eventos) => {
        this.eventos = eventos
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .slice(0, 5);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando eventos:', error);
        this.eventos = [];
      }
    });
  }

  cargarPartidosPorEleccionId(eleccionId: number): void {
    this.loading = true;
    this.partidoService.getParticipacionesPorEleccion(eleccionId).subscribe({
      next: (partidos) => {
        console.log('Partidos recibidos del API:', partidos);
        // Verificar la estructura de cada partido
        partidos.forEach(p => {
          console.log(`Partido: ${p.partidoNombre}, ID participación: ${p.id}, partidoId: ${p.partidoId}`);
        });
        this.partidos = partidos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando partidos:', error);
        this.partidos = [];
        this.loading = false;
      }
    });
  }

  // ========== FILTROS DE BÚSQUEDA ==========
  onComunidadSearchChange(): void {
    const search = this.comunidadSearchText.toLowerCase();
    this.comunidadesFiltradas = this.comunidades.filter(c =>
      c.nombre.toLowerCase().includes(search)
    );
    this.cdr.detectChanges();
  }

  onMunicipioSearchChange(): void {
    const search = this.municipioSearchText.toLowerCase();
    this.municipiosFiltrados = this.municipios.filter(m =>
      m.nombre.toLowerCase().includes(search)
    );
    this.cdr.detectChanges();
  }

  // ========== RESULTADOS ANTERIORES ==========
  cargarResultados(): void {
    if (this.anioSeleccionado === 2023) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 38, votos: 42000, color: '#1E88E5' },
        { partido: 'PSOE', porcentaje: 32, votos: 35000, color: '#E63946' },
        { partido: 'VOX', porcentaje: 15, votos: 16000, color: '#2E7D32' },
        { partido: 'SUMAR', porcentaje: 10, votos: 11000, color: '#FF9800' },
        { partido: 'OTROS', porcentaje: 5, votos: 5000, color: '#9E9E9E' }
      ];
    } else if (this.anioSeleccionado === 2019) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 35, votos: 38000, color: '#1E88E5' },
        { partido: 'PSOE', porcentaje: 30, votos: 32000, color: '#E63946' },
        { partido: 'VOX', porcentaje: 18, votos: 19000, color: '#2E7D32' },
        { partido: 'SUMAR', porcentaje: 12, votos: 13000, color: '#FF9800' },
        { partido: 'OTROS', porcentaje: 5, votos: 5000, color: '#9E9E9E' }
      ];
    } else if (this.anioSeleccionado === 2015) {
      this.resultadosActuales = [
        { partido: 'PP', porcentaje: 40, votos: 43000, color: '#1E88E5' },
        { partido: 'PSOE', porcentaje: 35, votos: 37000, color: '#E63946' },
        { partido: 'VOX', porcentaje: 10, votos: 10000, color: '#2E7D32' },
        { partido: 'SUMAR', porcentaje: 10, votos: 10000, color: '#FF9800' },
        { partido: 'OTROS', porcentaje: 5, votos: 5000, color: '#9E9E9E' }
      ];
    }
    this.cdr.detectChanges();
  }

  // ========== NAVEGACIÓN POR NIVELES ==========
  onNivelChange(tipo: string): void {
    this.nivelSeleccionado = tipo;
    this.comunidadSeleccionada = null;
    this.municipioSeleccionado = null;
    this.mostrarSelectorComunidad = tipo !== 'NACIONAL';
    this.mostrarSelectorMunicipio = false;
    this.partidos = [];
    this.comunidadSearchText = '';
    this.municipioSearchText = '';

    if (tipo === 'NACIONAL') {
      this.temaService.setTema({
        colorPrincipal: '#C0392B',
        colorSecundario: '#F1C40F',
        colorAcento: '#E67E22',
        colorFondo: '#FFF8F0',
        tipo: 'NACIONAL',
        nombre: 'España'
      });
      this.cargarPartidosNacionales();
      this.cargarEventosPorEleccion('NACIONAL', 'España');
    }
    this.cdr.detectChanges();
  }

  onComunidadChange(comunidad: Comunidad): void {
    this.comunidadSeleccionada = comunidad;
    this.municipioSeleccionado = null;
    this.municipioSearchText = '';

    // Resetear el texto de búsqueda de comunidad
    this.comunidadSearchText = comunidad.nombre;

    this.temaService.setTema({
      colorPrincipal: comunidad.colorPrimario,
      colorSecundario: comunidad.colorSecundario,
      colorAcento: comunidad.colorAcento || comunidad.colorSecundario,
      colorFondo: comunidad.colorFondo || '#FFFDF7',
      tipo: 'AUTONOMICA',
      nombre: comunidad.nombre
    });

    if (this.nivelSeleccionado === 'MUNICIPAL') {
      this.mostrarSelectorMunicipio = true;
      this.cargarMunicipios(comunidad.nombre);
    } else {
      this.cargarPartidosPorComunidad(comunidad.nombre);
      this.cargarEventosPorEleccion('AUTONOMICA', comunidad.nombre);
    }
    this.cdr.detectChanges();
  }

  onMunicipioChange(municipio: Municipio): void {
    this.municipioSeleccionado = municipio;

    // Resetear el texto de búsqueda de municipio
    this.municipioSearchText = municipio.nombre;

    this.temaService.setTema({
      colorPrincipal: municipio.colorPrimario,
      colorSecundario: municipio.colorSecundario,
      colorAcento: municipio.colorAcento || municipio.colorSecundario,
      colorFondo: municipio.colorFondo || '#FFFDF7',
      tipo: 'MUNICIPAL',
      nombre: municipio.nombre
    });

    this.cargarPartidosPorMunicipio(municipio.nombre);
    this.cargarEventosPorEleccion('MUNICIPAL', municipio.nombre);
    this.cdr.detectChanges();
  }

  // ========== CARGA DE PARTIDOS POR NIVEL ==========
  cargarPartidosNacionales(): void {
    const eleccion = this.elecciones.find(e => e.tipo === 'NACIONAL' && e.ambito === 'España');
    if (eleccion) {
      this.cargarPartidosPorEleccionId(eleccion.id);
    } else {
      console.error('No se encontró la elección nacional');
    }
    this.cdr.detectChanges();
  }

  cargarPartidosPorComunidad(comunidadNombre: string): void {
    this.loading = true;

    this.partidoService
      .getParticipacionesPorTipoAmbito('AUTONOMICA', comunidadNombre)
      .subscribe({
        next: (partidos) => {
          console.log('Partidos AUTONÓMICOS:', partidos);
          this.partidos = partidos;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando partidos autonómicos:', error);
          this.partidos = [];
          this.loading = false;
        }
      });
    this.cdr.detectChanges();
  }

  cargarPartidosPorMunicipio(municipioNombre: string): void {
    this.loading = true;

  this.partidoService
    .getParticipacionesPorTipoAmbito('MUNICIPAL', municipioNombre)
    .subscribe({
      next: (partidos) => {
        this.partidos = partidos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando partidos municipales:', error);
        this.partidos = [];
        this.loading = false;
      }
    });
    this.cdr.detectChanges();
  }

  // ========== EVENTOS DEL USUARIO ==========
  onAnioChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.anioSeleccionado = Number(select.value);
    this.cargarResultados();
    this.cdr.detectChanges();
  }

  verPartido(partidoId: number): void {
    console.log('verPartido llamado con ID:', partidoId);
    // Buscar el partido en la lista actual
    const partido = this.partidos.find(p => p.id === partidoId);
    console.log('Partido encontrado:', partido);
    this.router.navigate(['/partido', partidoId]);
  }

  verEvento(eventoId: number): void {
    console.log('Ver evento:', eventoId);
    this.cdr.detectChanges();
  }

  verMesas(): void {
    alert('Funcionalidad de mesas electorales - Próximamente');
  }

  verCenso(): void {
    alert('Funcionalidad de censo electoral - Próximamente');
  }

  goToHome(): void {
    window.location.reload();
  }

  // ========== UTILIDADES ==========
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/partidos/placeholder.png';
  }

  /* // Filtro para búsqueda de municipios
  getMunicipiosFiltrados(): Municipio[] {
    if (!this.searchText) return this.municipios;
    return this.municipios.filter(m =>
      m.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  } */

}
