export interface ResultadoBusqueda {
  tipo: 'PARTIDO' | 'CANDIDATO' | 'EVENTO' | 'MUNICIPIO';
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
  color?: string;
  link: string;
  subtitulo?: string;
  destacado?: boolean;
}

export interface ResultadosAgrupados {
  partidos: ResultadoBusqueda[];
  candidatos: ResultadoBusqueda[];
  eventos: ResultadoBusqueda[];
  municipios: ResultadoBusqueda[];
}

export interface Sugerencia {
  texto: string;
  tipo: string;
  id?: number;
}


