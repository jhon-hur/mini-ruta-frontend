import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Report {
    id?: string;
    comment?: string;
    score?: string;
    datePublished?: string;
    numberLine?: string;
    line?: 'Rojo' | 'Verde' | 'Celeste';
    background?: 'Rojo' | 'Verde' | 'Celeste';
    isActive?: boolean;
}

@Injectable()
export class ReportService {
    constructor(private http: HttpClient) {}

    getMiniLinesData(): Report[] {
        return [
            { id: '1', comment: 'Muy puntual', numberLine: '1', line: 'Celeste', background: 'Celeste', isActive: true, score: '3', datePublished: '03 de enero de 2025' },
            { id: '2', comment: 'Demora frecuente', numberLine: '2', line: 'Verde', background: 'Verde', isActive: true, score: '4', datePublished: '03 de enero de 2025' },
            { id: '3', comment: 'Conductor amable', numberLine: '3', line: 'Verde', background: 'Verde', isActive: true, score: '2', datePublished: '04 de enero de 2025' },
            { id: '4', comment: 'Paradas claras', numberLine: '4', line: 'Verde', background: 'Verde', isActive: false, score: '5', datePublished: '05 de enero de 2025' },
            { id: '5', comment: 'Siempre lleno', numberLine: '5', line: 'Verde', background: 'Verde', isActive: true, score: '1', datePublished: '06 de enero de 2025' },
            { id: '6', comment: 'Buen servicio', numberLine: '6', line: 'Verde', background: 'Verde', isActive: false, score: '2', datePublished: '07 de enero de 2025' },
            { id: '7', comment: 'Mal olor', numberLine: '6', line: 'Celeste', background: 'Celeste', isActive: true, score: '3', datePublished: '08 de enero de 2025' },
            { id: '8', comment: 'Frenó mal', numberLine: '8', line: 'Verde', background: 'Verde', isActive: true, score: '3', datePublished: '09 de enero de 2025' },
            { id: '9', comment: 'Conductor amable', numberLine: '9', line: 'Verde', background: 'Verde', isActive: true, score: '2', datePublished: '10 de enero de 2025' },
            { id: '10', comment: 'Asientos rotos', numberLine: '10', line: 'Verde', background: 'Verde', isActive: true, score: '3', datePublished: '13 de enero de 2025' },
            { id: '11', comment: 'Chofer grosero', numberLine: '11', line: 'Verde', background: 'Verde', isActive: true, score: '2', datePublished: '15 de enero de 2025' },
            { id: '12', comment: 'Buen servicio', numberLine: '12', line: 'Verde', background: 'Verde', isActive: true, score: '2', datePublished: '16 de enero de 2025' },
            { id: '13', comment: 'Demora habitual', numberLine: '13', line: 'Verde', background: 'Verde', isActive: false, score: '5', datePublished: '18 de enero de 2025' },
            { id: '14', comment: 'Ruta larga', numberLine: '14', line: 'Verde', background: 'Verde', isActive: true, score: '4', datePublished: '19 de enero de 2025' },
            { id: '15', comment: 'Chofer grosero', numberLine: '15', line: 'Verde', background: 'Verde', isActive: true, score: '4', datePublished: '20 de enero de 2025' },
            { id: '16', comment: 'Horario exacto', numberLine: '16', line: 'Verde', background: 'Verde', isActive: true, score: '1', datePublished: '22 de enero de 2025' },
            { id: '17', comment: 'Conductor amable', numberLine: '17', line: 'Verde', background: 'Verde', isActive: true, score: '2', datePublished: '23 de enero de 2025' },
            { id: '18', comment: 'Asientos rotos', numberLine: '18', line: 'Verde', background: 'Verde', isActive: true, score: '3', datePublished: '28 de enero de 2025' },
            { id: '19', comment: 'Muy educado', numberLine: '19', line: 'Verde', background: 'Verde', isActive: false, score: '4', datePublished: '03 de febrero de 2025' },
            { id: '20', comment: 'Buen servicio', numberLine: '20', line: 'Verde', background: 'Verde', isActive: true, score: '5', datePublished: '04 de febrero de 2025' },
            { id: '21', comment: 'Bien señalizado', numberLine: '21', line: 'Verde', background: 'Verde', isActive: true, score: '3', datePublished: '05 de febrero de 2025' },
            { id: '22', comment: 'Chofer grosero', numberLine: '22', line: 'Verde', background: 'Verde', isActive: true, score: '3', datePublished: '06 de febrero de 2025' },
            { id: '23', comment: 'Conductor amable', numberLine: '101', line: 'Rojo', background: 'Rojo', isActive: false, score: '2', datePublished: '07 de febrero de 2025' },
            { id: '24', comment: 'Horario exacto', numberLine: '101', line: 'Rojo', background: 'Rojo', isActive: true, score: '2', datePublished: '08 de febrero de 2025' },
            { id: '25', comment: 'Mal estado', numberLine: '103', line: 'Rojo', background: 'Rojo', isActive: true, score: '2', datePublished: '10 de febrero de 2025' },
            { id: '26', comment: 'Ruta confusa', numberLine: '104', line: 'Rojo', background: 'Rojo', isActive: true, score: '4', datePublished: '13 de febrero de 2025' },
            { id: '27', comment: 'Conductor amable', numberLine: '105', line: 'Rojo', background: 'Rojo', isActive: true, score: '5', datePublished: '16 de febrero de 2025' },
            { id: '28', comment: 'Ruta confusa', numberLine: '109', line: 'Rojo', background: 'Rojo', isActive: true, score: '2', datePublished: '19 de febrero de 2025' },
            { id: '29', comment: 'Sin aire', numberLine: '110', line: 'Rojo', background: 'Rojo', isActive: true, score: '1', datePublished: '20 de febrero de 2025' },
            { id: '30', comment: 'Buen servicio', numberLine: '112', line: 'Rojo', background: 'Rojo', isActive: false, score: '3', datePublished: '25 de febrero de 2025' }
        ];
    }

    getMiniLines(): Promise<Report[]> {
        return Promise.resolve(this.getMiniLinesData());
    }
}
