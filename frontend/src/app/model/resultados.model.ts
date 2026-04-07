export interface ResultadosEleccion {
  id: number;
  eleccionId: number;
  eleccionTipo: string;
  eleccionAmbito: string;
  eleccionAnio: number;
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoColor: string;
  votos: number;
  porcentaje: number;
  concejales?: number;
  escanios?: number;
}

export interface ResultadosHistorico {
  anio: number;
  partido: string;
  votos: number;
  porcentaje: number;
}

export interface ComparativaResultados {
  eleccion: string;
  resultados: ResultadosHistorico[];
}
