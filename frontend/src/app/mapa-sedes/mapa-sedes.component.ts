import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { SedeMapa } from '../model/sede.model';
import { SedeService } from '../services/sede.service';

// Configurar iconos de Leaflet
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-mapa-sedes',
  standalone: false,
  templateUrl: './mapa-sedes.component.html',
  styleUrls: ['./mapa-sedes.component.scss']
})
export class MapaSedesComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() sedes: SedeMapa[] = [];
  @Input() municipio: string = 'Oviedo';
  @Input() mostrarColegios: boolean = true;

  private map: any;
  private markers: L.Marker[] = [];
  private mapInitialized: boolean = false;
  private colegios: any[] = [];

  constructor(
    private sedeService: SedeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarColegios();
  }

  cargarColegios(): void {
    if (this.mostrarColegios) {
      this.sedeService.getColegiosElectorales(this.municipio).subscribe({
        next: (colegios) => {
          this.colegios = colegios;
          if (this.mapInitialized) {
            this.cargarMarcadores();
          }
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error cargando colegios:', error)
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 100);
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municipio'] && !changes['municipio'].firstChange) {
      this.cargarColegios();
    }
    if (this.mapInitialized && (changes['sedes'] || changes['colegios'])) {
      this.cargarMarcadores();
    }
    this.cdr.detectChanges();
  }

  initMap(): void {
    const coordenadas: { [key: string]: L.LatLngExpression } = {
      'Oviedo': [43.3619, -5.8494],
      'Asturias': [43.3619, -5.8494],
      'España': [40.4168, -3.7038]
    };

    const centro = coordenadas[this.municipio] || coordenadas['Oviedo'];

    this.map = L.map('mapa-sedes').setView(centro, 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.mapInitialized = true;
    this.cargarMarcadores();
    this.cdr.detectChanges();
  }

  cargarMarcadores(): void {
    if (!this.mapInitialized) return;

    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Marcadores de colegios electorales
    if (this.mostrarColegios && this.colegios.length > 0) {
      this.colegios.forEach(colegio => {
        const markerIcon = L.divIcon({
          className: 'colegio-marker',
          html: '<div class="colegio-icon">🏫</div>',
          iconSize: [30, 30],
          popupAnchor: [0, -15]
        });

        const marker = L.marker([colegio.latitud, colegio.longitud], { icon: markerIcon }).addTo(this.map);
        marker.bindPopup(`
          <b>${colegio.nombre}</b><br>
          ${colegio.direccion}<br>
          <span class="colegio-tipo">Colegio Electoral</span>
        `);
        this.markers.push(marker);
      });
    }
    // Marcadores de sedes de partidos
    if (this.sedes && this.sedes.length > 0) {
      this.sedes.forEach(sede => {
        const markerIcon = L.divIcon({
          className: 'partido-marker',
          html: `<div class="partido-icon" style="background-color: ${sede.partidoColorPrimario}">${sede.partidoSiglas?.substring(0, 2)}</div>`,
          iconSize: [30, 30],
          popupAnchor: [0, -15]
        });

        const marker = L.marker([sede.latitud, sede.longitud], { icon: markerIcon }).addTo(this.map);
        marker.bindPopup(`
          <b>${sede.nombre}</b><br>
          ${sede.direccion}<br>
          <span style="color: ${sede.partidoColorPrimario}">${sede.partidoNombre}</span>
        `);
        this.markers.push(marker);
      });
    }

    // Ajustar vista para mostrar todos los marcadores
    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
    this.cdr.detectChanges();
  }

  agregarMarcadores(sedes: any[]): void {
    sedes.forEach(sede => {
      const marker = L.marker([sede.latitud || sede.lat, sede.longitud || sede.lng]).addTo(this.map);
      marker.bindPopup(`
        <b>${sede.nombre}</b><br>
        ${sede.direccion}<br>
        <small style="color: ${sede.partidoColorPrimario}">${sede.partidoNombre || 'Sede electoral'}</small>
      `);
      this.markers.push(marker);
    });
    this.cdr.detectChanges();
  }
}
