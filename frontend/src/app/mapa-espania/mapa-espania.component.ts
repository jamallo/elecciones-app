import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

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

interface Comunidad {
  id: number;
  nombre: string;
  centro: [number, number];
  colorPrimario: string;
  colorSecundario: string;
}

@Component({
  selector: 'app-mapa-espania',
  standalone: false,
  templateUrl: './mapa-espania.component.html',
  styleUrl: './mapa-espania.component.scss',
})
export class MapaEspaniaComponent implements OnInit, AfterViewInit {

  @Input() comunidadSeleccionada: Comunidad | null = null;
  @Input() municipioSeleccionado: any = null;
  @Output() onComunidadClick = new EventEmitter<Comunidad>();
  @Output() onMunicipioClick = new EventEmitter<any>();

  private map: any;
  private currentZoom = 6;

  // Datos de comunidades autónomas
  comunidades: Comunidad[] = [
    { id: 1, nombre: 'Andalucía', centro: [37.5, -4.5], colorPrimario: '#008000', colorSecundario: '#FFFFFF' },
    { id: 2, nombre: 'Aragón', centro: [41.0, -1.0], colorPrimario: '#ED1C24', colorSecundario: '#FFD700' },
    { id: 3, nombre: 'Asturias', centro: [43.3, -5.8], colorPrimario: '#4B0082', colorSecundario: '#FFD700' },
    { id: 4, nombre: 'Baleares', centro: [39.5, 3.0], colorPrimario: '#0066CC', colorSecundario: '#FFD700' },
    { id: 5, nombre: 'Canarias', centro: [28.0, -15.5], colorPrimario: '#003366', colorSecundario: '#FFFFFF' },
    { id: 6, nombre: 'Cantabria', centro: [43.2, -4.0], colorPrimario: '#E63946', colorSecundario: '#FFD700' },
    { id: 7, nombre: 'Castilla-La Mancha', centro: [39.5, -3.5], colorPrimario: '#800000', colorSecundario: '#FFD700' },
    { id: 8, nombre: 'Castilla y León', centro: [41.5, -4.5], colorPrimario: '#800000', colorSecundario: '#FFD700' },
    { id: 9, nombre: 'Cataluña', centro: [41.5, 1.5], colorPrimario: '#FFD700', colorSecundario: '#ED1C24' },
    { id: 10, nombre: 'Ceuta', centro: [35.9, -5.3], colorPrimario: '#0066CC', colorSecundario: '#FFFFFF' },
    { id: 11, nombre: 'Extremadura', centro: [39.0, -6.0], colorPrimario: '#008000', colorSecundario: '#000000' },
    { id: 12, nombre: 'Galicia', centro: [42.8, -8.0], colorPrimario: '#003366', colorSecundario: '#FFFFFF' },
    { id: 13, nombre: 'La Rioja', centro: [42.3, -2.5], colorPrimario: '#ED1C24', colorSecundario: '#FFD700' },
    { id: 14, nombre: 'Madrid', centro: [40.4, -3.7], colorPrimario: '#ED1C24', colorSecundario: '#FFFFFF' },
    { id: 15, nombre: 'Melilla', centro: [35.3, -2.9], colorPrimario: '#0066CC', colorSecundario: '#FFFFFF' },
    { id: 16, nombre: 'Murcia', centro: [38.0, -1.5], colorPrimario: '#ED1C24', colorSecundario: '#FFFFFF' },
    { id: 17, nombre: 'Navarra', centro: [42.8, -1.6], colorPrimario: '#008000', colorSecundario: '#FFD700' },
    { id: 18, nombre: 'País Vasco', centro: [43.0, -2.5], colorPrimario: '#ED1C24', colorSecundario: '#008000' },
    { id: 19, nombre: 'Valencia', centro: [39.5, -0.5], colorPrimario: '#FFD700', colorSecundario: '#ED1C24' }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('mapa-espana').setView([40.4168, -3.7038], this.currentZoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.cargarComunidades();
  }

  cargarComunidades(): void {
    // Datos de ejemplo - idealmente usar GeoJSON
    const comunidadesCoords = [
      { nombre: 'Andalucía', centro: [37.5, -4.5], color: '#008000' },
      { nombre: 'Aragón', centro: [41.0, -1.0], color: '#ED1C24' },
      { nombre: 'Asturias', centro: [43.3, -5.8], color: '#4B0082' },
      { nombre: 'Baleares', centro: [39.5, 3.0], color: '#0066CC' },
      { nombre: 'Canarias', centro: [28.0, -15.5], color: '#003366' },
      { nombre: 'Cantabria', centro: [43.2, -4.0], color: '#E63946' },
      { nombre: 'Castilla-La Mancha', centro: [39.5, -3.5], color: '#800000' },
      { nombre: 'Castilla y León', centro: [41.5, -4.5], color: '#800000' },
      { nombre: 'Cataluña', centro: [41.5, 1.5], color: '#FFD700' },
      { nombre: 'Madrid', centro: [40.4, -3.7], color: '#ED1C24' },
      { nombre: 'País Vasco', centro: [43.0, -2.5], color: '#ED1C24' },
      { nombre: 'Valencia', centro: [39.5, -0.5], color: '#FFD700' }
    ];

    comunidadesCoords.forEach(comunidad => {
      const marker = L.marker(comunidad.centro as L.LatLngExpression).addTo(this.map);
      marker.bindPopup(`
        <b>${comunidad.nombre}</b><br>
        <button onclick="window.dispatchEvent(new CustomEvent('comunidadClick', {detail: '${comunidad.nombre}'}))">
          Ver elecciones
        </button>
      `);

      // Evento personalizado
      window.addEventListener('comunidadClick', (e: any) => {
        const comunidad = this.comunidades?.find(c => c.nombre === e.detail);
        if (comunidad) {
          this.onComunidadClick.emit(comunidad);
        }
      });
    });
  }

  zoomIn(): void {
    this.currentZoom++;
    this.map.setZoom(this.currentZoom);
  }

  zoomOut(): void {
    this.currentZoom--;
    this.map.setZoom(this.currentZoom);
  }

}
