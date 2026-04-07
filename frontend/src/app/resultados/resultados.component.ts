import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Eleccion } from '../model/eleccion.model';
import { ResultadosEleccion } from '../model/resultados.model';
import { Chart } from 'chart.js';
import { EleccionService } from '../services/eleccion.service';
import { ResultadoService } from '../services/resultado.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: false,
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss',
})
export class ResultadosComponent implements OnInit, AfterViewInit {

  @ViewChild('resultadosCanvas', {static: false }) resultadosCanvas!: ElementRef<HTMLCanvasElement>;

  //Selección
  elecciones: Eleccion[] = [];
  eleccionSeleccionada: Eleccion | null = null;

  //Datos
  resultados: ResultadosEleccion[] = [];
  resultadosHistoricos: any[] = [];
  partidos: any[] = [];

  //Gráfico
  chart: Chart | null = null;

  //Estados
  loading: boolean = false;
  vistaActual: 'grafico' | 'tabla' | 'historico' = 'grafico';

  constructor(
    private eleccionService: EleccionService,
    private resultadoService: ResultadoService,
    private temaService: TemaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.temaService.resetToNeutral();
    this.cargarElecciones();
  }

  ngAfterViewInit(): void {

  }

  cargarElecciones(): void {
    this.loading = true;
    this.eleccionService.getElecciones().subscribe({
      next: (elecciones) => {
        this.elecciones = elecciones;
        if(this.elecciones.length > 0) {
        this.eleccionSeleccionada = this.elecciones[0];
        this.cargarResultados();
        }
      this.loading = false;
      this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error cargando elecciones: ',  error);
        this.loading = false;
      }
    });
  }

  onEleccionChange(eleccionId: number): void {
    console.log('Elección seleccionada ID:', eleccionId);
    this.eleccionSeleccionada = this.elecciones.find(e => e.id === eleccionId) || null;
    this.cargarResultados();
  }

  cargarResultados(): void {

    if (!this.eleccionSeleccionada) return;

    this.loading = true;
    this.resultadoService.getResultadosByEleccion(this.eleccionSeleccionada.id).subscribe({
      next: (resultados) => {
        console.log('Resultados RAW:', resultados);
        this.resultados = resultados.sort((a, b) => b.porcentaje - a.porcentaje);
        this.actualizarGrafico();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando resultados:', error);
        // Datos de ejemplo
        this.resultados = this.getResultadosEjemplo();
        this.actualizarGrafico();
        this.loading = false;
      }
    });
  }

  getResultadosEjemplo(): ResultadosEleccion[] {
    return [
      { id: 1, eleccionId: 1, eleccionTipo: 'NACIONAL', eleccionAmbito: 'España', eleccionAnio: 2023,
        partidoId: 1, partidoNombre: 'Partido Popular', partidoSiglas: 'PP', partidoColor: '#1E88E5',
        votos: 5200000, porcentaje: 33.5, escanios: 137 },
      { id: 2, eleccionId: 1, eleccionTipo: 'NACIONAL', eleccionAmbito: 'España', eleccionAnio: 2023,
        partidoId: 2, partidoNombre: 'PSOE', partidoSiglas: 'PSOE', partidoColor: '#E63946',
        votos: 4800000, porcentaje: 31.2, escanios: 120 },
      { id: 3, eleccionId: 1, eleccionTipo: 'NACIONAL', eleccionAmbito: 'España', eleccionAnio: 2023,
        partidoId: 3, partidoNombre: 'Vox', partidoSiglas: 'VOX', partidoColor: '#2E7D32',
        votos: 2500000, porcentaje: 16.5, escanios: 52 }
    ];
  }

  actualizarGrafico(): void {
    setTimeout(() => {
      const canvas = this.resultadosCanvas?.nativeElement;
      if (!canvas) return;

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.resultados.map(r => r.partidoSiglas),
          datasets: [{
            label: 'Porcentaje de votos (%)',
            data: this.resultados.map(r => r.porcentaje),
            backgroundColor: this.resultados.map(r => r.partidoColor),
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const resultado = this.resultados[context.dataIndex];
                  return `${resultado.porcentaje}% (${resultado.votos.toLocaleString()} votos)`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 50,
              title: { display: true, text: 'Porcentaje (%)' }
            }
          }
        }
      });
      this.cdr.detectChanges();
    }, 100);
  }

  cambiarVista(vista: 'grafico' | 'tabla' | 'historico'): void {
    this.vistaActual = vista;
    if (vista === 'historico') {
      this.cargarDatosHistoricos();
    }
    if (vista === 'grafico') {
      // Esperar a que Angular renderice el canvas
      setTimeout(() => {
        this.actualizarGrafico();
      }, 0);
    }
    this.cdr.detectChanges();
  }

  cargarDatosHistoricos(): void {
    // Datos de ejemplo históricos
    this.resultadosHistoricos = [
      { anio: 2019, partidos: [
        { nombre: 'PP', porcentaje: 35, color: '#1E88E5' },
        { nombre: 'PSOE', porcentaje: 30, color: '#E63946' },
        { nombre: 'VOX', porcentaje: 18, color: '#2E7D32' }
      ]},
      { anio: 2015, partidos: [
        { nombre: 'PP', porcentaje: 40, color: '#1E88E5' },
        { nombre: 'PSOE', porcentaje: 35, color: '#E63946' },
        { nombre: 'VOX', porcentaje: 10, color: '#2E7D32' }
      ]}
    ];
  }

  getTotalVotos(): number {
    return this.resultados.reduce((sum, r) => sum + r.votos, 0);
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
  }

}
