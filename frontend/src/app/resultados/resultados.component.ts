import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Eleccion } from '../model/eleccion.model';
import { ResultadosEleccion } from '../model/resultados.model';
import { Chart } from 'chart.js/auto';
import { EleccionService } from '../services/eleccion.service';
import { ResultadoService } from '../services/resultado.service';
import { TemaService } from '../services/tema.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-resultados',
  standalone: false,
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss',
})
export class ResultadosComponent implements OnInit, AfterViewInit {

  @ViewChild('resultadosCanvas', {static: false }) resultadosCanvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('comparativaCanvas') comparativaCanvas!: ElementRef<HTMLCanvasElement>;

  //Selección
  elecciones: Eleccion[] = [];
  eleccionSeleccionada: Eleccion | null = null;
  eleccionComparativa: Eleccion | null = null;

  //Datos
  resultados: ResultadosEleccion[] = [];
  resultadosHistoricos: any[] = [];
  partidos: any[] = [];
  resultadosComparativa: ResultadosEleccion[] = [];

  //Gráfico
  chart: Chart | null = null;
  chartComparativa: Chart | null = null;

  //Estados
  loading: boolean = false;
  vistaActual: 'grafico' | 'tabla' | 'historico' | 'comparativa'= 'grafico';
  mostrarComparativa: boolean = false;
  partidoSeleccionado: number | null = null;

  // Filtros
  tipoFiltro: 'nacional' | 'comunidad' | 'municipio' = 'nacional';
  comunidadSeleccionada: number | null = null;
  municipioSeleccionado: number | null = null;
  comunidades: any[] = [];
  municipios: any[] = [];

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
    this.cargarComunidades();
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

  cargarComunidades(): void {
    this.eleccionService.getComunidades().subscribe({
      next: (comunidades) => {
        this.comunidades = comunidades;
      },
      error: (error) => console.error('Error cargando comunidades:', error)
    });
  }

  cargarMunicipios(comunidadId: number): void {
    this.eleccionService.getMunicipiosByComunidad(comunidadId.toString()).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => console.error('Error cargando municipios:', error)
    });
  }


  onEleccionChange(eleccionId: number): void {
    this.eleccionSeleccionada = this.elecciones.find(e => e.id === eleccionId) || null;
    if (this.vistaActual === 'comparativa') {
      this.cargarComparativa();
    } else {
      this.cargarResultados();
    }
  }

  cargarResultados(): void {

    if (!this.eleccionSeleccionada) return;

    this.loading = true;

    let request;
    if (this.tipoFiltro === 'nacional') {
      request = this.resultadoService.getResultadosByEleccion(this.eleccionSeleccionada.id);
    } else if (this.tipoFiltro === 'comunidad' && this.comunidadSeleccionada) {
      request = this.resultadoService.getResultadosByComunidad(this.comunidadSeleccionada);
    } else if (this.tipoFiltro === 'municipio' && this.municipioSeleccionado) {
      request = this.resultadoService.getResultadosByMunicipio(this.municipioSeleccionado);
    } else {
      request = this.resultadoService.getResultadosByEleccion(this.eleccionSeleccionada.id);
    }

    request.subscribe({
      next: (resultados) => {
        this.resultados = resultados.sort((a, b) => b.porcentaje - a.porcentaje);
        this.actualizarGrafico();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando resultados:', error);
        this.resultados = this.getResultadosEjemplo();
        this.actualizarGrafico();
        this.loading = false;
      }
    });
  }

  cargarComparativa(): void {
    if (!this.eleccionSeleccionada || !this.eleccionComparativa) return;

    this.loading = true;
    this.resultadoService.getResultadosByEleccion(this.eleccionSeleccionada.id).subscribe({
      next: (resultados1) => {
        this.resultados = resultados1.sort((a, b) => b.porcentaje - a.porcentaje);
        this.actualizarGrafico();

        this.resultadoService.getResultadosByEleccion(this.eleccionComparativa!.id).subscribe({
          next: (resultados2) => {
            this.resultadosComparativa = resultados2.sort((a, b) => b.porcentaje - a.porcentaje);
            this.actualizarGraficoComparativa();
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
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

      if (this.chart) this.chart.destroy();

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
              title: { display: true, text: 'Porcentaje (%)' }
            }
          }
        }
      });
      this.cdr.detectChanges();
    }, 100);
  }

  actualizarGraficoComparativa(): void {
    setTimeout(() => {
      const canvas = this.comparativaCanvas?.nativeElement;
      if (!canvas) return;

      if (this.chartComparativa) this.chartComparativa.destroy();

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const partidos = [...new Set([
        ...this.resultados.map(r => r.partidoSiglas),
        ...this.resultadosComparativa.map(r => r.partidoSiglas)
      ])];

      const datos1 = partidos.map(p => {
        const r = this.resultados.find(r => r.partidoSiglas === p);
        return r ? r.porcentaje : 0;
      });

      const datos2 = partidos.map(p => {
        const r = this.resultadosComparativa.find(r => r.partidoSiglas === p);
        return r ? r.porcentaje : 0;
      });

      this.chartComparativa = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: partidos,
          datasets: [
            {
              label: `${this.eleccionSeleccionada?.anio}`,
              data: datos1,
              backgroundColor: '#1E88E5',
              borderRadius: 8
            },
            {
              label: `${this.eleccionComparativa?.anio}`,
              data: datos2,
              backgroundColor: '#E63946',
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
      this.cdr.detectChanges();
    }, 100);
  }

  cambiarVista(vista: 'grafico' | 'tabla' | 'historico' | 'comparativa'): void {
    this.vistaActual = vista;
    if (vista === 'historico') {
      this.cargarDatosHistoricos();
    } else if (vista === 'comparativa') {
      this.mostrarComparativa = true;
    } else {
      this.mostrarComparativa = false;
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

  getTotalEscanios(): number {
    return this.resultados.reduce((sum, r) => sum + (r.escanios || 0), 0);
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
    this.temaService.resetToNeutral();
  }

  // Exportar a PDF
  exportarPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Resultados Electorales - ${this.eleccionSeleccionada?.tipo} ${this.eleccionSeleccionada?.ambito} ${this.eleccionSeleccionada?.anio}`, 14, 20);

    const tableData = this.resultados.map(r => [
      r.partidoNombre,
      r.votos.toLocaleString(),
      `${r.porcentaje}%`,
      r.escanios?.toString() || '-'
    ]);

    autoTable(doc, {
      head: [['Partido', 'Votos', 'Porcentaje', 'Escaños']],
      body: tableData,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [0, 35, 108] }
    });

    doc.save(`resultados_${this.eleccionSeleccionada?.tipo}_${this.eleccionSeleccionada?.ambito}_${this.eleccionSeleccionada?.anio}.pdf`);
  }

  // Exportar a Excel
  exportarExcel(): void {
    const data = this.resultados.map(r => ({
      Partido: r.partidoNombre,
      Siglas: r.partidoSiglas,
      Votos: r.votos,
      Porcentaje: `${r.porcentaje}%`,
      Escaños: r.escanios || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    XLSX.writeFile(wb, `resultados_${this.eleccionSeleccionada?.tipo}_${this.eleccionSeleccionada?.ambito}_${this.eleccionSeleccionada?.anio}.xlsx`);
  }

  onTipoFiltroChange(): void {
    if (this.tipoFiltro !== 'comunidad') {
      this.comunidadSeleccionada = null;
    }
    if (this.tipoFiltro !== 'municipio') {
      this.municipioSeleccionado = null;
    }
    this.cargarResultados();
  }

  onComunidadChange(): void {
    if (this.comunidadSeleccionada) {
      this.cargarMunicipios(this.comunidadSeleccionada);
    }
    this.cargarResultados();
  }

  onMunicipioChange(): void {
    this.cargarResultados();
  }


  onEleccionComparativaChange(eleccionId: number): void {
    this.eleccionComparativa = this.elecciones.find(e => e.id === eleccionId) || null;
    this.cargarComparativa();
  }

}
