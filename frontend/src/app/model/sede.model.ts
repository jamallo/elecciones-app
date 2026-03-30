export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  tipo: string;
  municipio: string;
  partidoEleccionId?: number;
}

export interface SedeMapa extends Sede {
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoColorPrimario: string;
  eleccionTipo: string;
  eleccionAmbito: string;
}
