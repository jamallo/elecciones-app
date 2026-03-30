import { Candidato } from "./candidato.model";
import { Evento } from "./evento.model";
import { InformacionPartido } from "./partido.model";
import { Sede } from "./sede.model";

export interface PartidoEleccion {
  id: number;
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoLogoUrl: string;
  partidoColorPrimario: string;
  eleccionId: number;
  eleccionTipo: string;
  eleccionAmbito: string;
  eleccionAnio?: number;
  informacion?: InformacionPartido;
  candidatos?: Candidato[];
  eventos?: Evento[];
  sedes?: Sede[];
}

export interface PartidoEleccionResumen {
  id: number;
  partidoId: number;
  partidoNombre: string;
  partidoSiglas: string;
  partidoLogoUrl: string;
  partidoColorPrimario: string;
  eleccionId: number;
  eleccionTipo: string;
  eleccionAmbito: string;
}
