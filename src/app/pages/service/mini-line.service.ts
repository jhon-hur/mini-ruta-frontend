import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface MiniLine {
    id?: string;
    numberLine?: string; 
    line?: 'Rojo' | 'Verde' | 'Celeste';
    linkPath?: string;
    background?: 'Rojo' | 'Verde' | 'Celeste';
    isActive?: boolean;
    frequency?: number;
    userId?: string;
    hours?: string; // formato: "05:00 - 20:30"
}

@Injectable()
export class MiniLineService {
    constructor(private http: HttpClient) {}

    getMiniLinesData(): MiniLine[] {
        return [
            { id: '1', numberLine: '1',  line: 'Celeste', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Celeste', isActive: true, frequency: 10, userId: 'u1', hours: '05:00 - 20:30' },
            { id: '2', numberLine: '2', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 12, userId: 'u2', hours: '06:00 - 21:00' },
            { id: '3', numberLine: '3', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 15, userId: 'u3', hours: '07:00 - 22:00' },
            { id: '4', numberLine: '4', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: false, frequency: 20, userId: 'u4', hours: '05:30 - 19:30' },
            { id: '5', numberLine: '5', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 8, userId: 'u5', hours: '06:30 - 20:00' },
            { id: '6', numberLine: '6', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: false, frequency: 18, userId: 'u6', hours: '07:30 - 21:30' },
            { id: '7', numberLine: '6', line: 'Celeste', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Celeste', isActive: true, frequency: 10, userId: 'u7', hours: '05:00 - 20:30' },
            { id: '8', numberLine: '8', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 14, userId: 'u8', hours: '06:00 - 21:00' },
            { id: '9', numberLine: '9', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 11, userId: 'u9', hours: '07:00 - 22:00' },
            { id: '10', numberLine: '10', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 9, userId: 'u10', hours: '05:30 - 19:30' },
            { id: '11', numberLine: '11', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 10, userId: 'u11', hours: '06:30 - 20:00' },
            { id: '12', numberLine: '12', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 13, userId: 'u12', hours: '07:30 - 21:30' },
            { id: '13', numberLine: '13', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: false, frequency: 16, userId: 'u13', hours: '05:00 - 20:30' },
            { id: '14', numberLine: '14', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 17, userId: 'u14', hours: '06:00 - 21:00' },
            { id: '15', numberLine: '15', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 19, userId: 'u15', hours: '07:00 - 22:00' },
            { id: '16', numberLine: '16', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 10, userId: 'u16', hours: '05:30 - 19:30' },
            { id: '17', numberLine: '17', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 7, userId: 'u17', hours: '06:30 - 20:00' },
            { id: '18', numberLine: '18', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 12, userId: 'u18', hours: '07:30 - 21:30' },
            { id: '19', numberLine: '19', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: false, frequency: 11, userId: 'u19', hours: '05:00 - 20:30' },
            { id: '20', numberLine: '20', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 10, userId: 'u20', hours: '06:00 - 21:00' },
            { id: '21', numberLine: '21', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 15, userId: 'u21', hours: '07:00 - 22:00' },
            { id: '22', numberLine: '22', line: 'Verde', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Verde', isActive: true, frequency: 20, userId: 'u22', hours: '05:30 - 19:30' },
            { id: '23', numberLine: '101', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: false, frequency: 18, userId: 'u23', hours: '06:30 - 20:00' },
            { id: '24', numberLine: '101', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 9, userId: 'u24', hours: '07:30 - 21:30' },
            { id: '25', numberLine: '103', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 8, userId: 'u25', hours: '05:00 - 20:30' },
            { id: '26', numberLine: '104', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 14, userId: 'u26', hours: '06:00 - 21:00' },
            { id: '27', numberLine: '105', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 13, userId: 'u27', hours: '07:00 - 22:00' },
            { id: '28', numberLine: '109', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 11, userId: 'u28', hours: '05:30 - 19:30' },
            { id: '29', numberLine: '110', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: true, frequency: 10, userId: 'u29', hours: '06:30 - 20:00' },
            { id: '30', numberLine: '112', line: 'Rojo', linkPath: 'https://www.google.com/maps/d/u/0/viewer?mid=1G1K8Xd3priQDmD_W1YHb2om2F3ar3Fg&ll=-17.973803446040275%2C-67.1032414&z=13', background: 'Rojo', isActive: false, frequency: 16, userId: 'u30', hours: '07:30 - 21:30' }
        ];
    }

    getMiniLines(): Promise<MiniLine[]> {
        return Promise.resolve(this.getMiniLinesData());
    }
}
