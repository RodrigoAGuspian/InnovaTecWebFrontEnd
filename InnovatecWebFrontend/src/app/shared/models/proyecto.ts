import { Resultado } from './resultado';
import { Grafica } from './grafica';

export class Proyecto {
  skey: string;
  imgsProyecto: string[];
  pathImgsProyecto: string[];
  titulo: string;
  autores: string[];
  resumen: string;
  objetivoG: string;
  objetivosE: string[];
  resumenResultados: string;
  resultados: Resultado[];
  infoGraficas: Grafica[];

}
