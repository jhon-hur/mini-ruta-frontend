import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface InventoryStatus {
    label: string;
    value: string;
}

export interface User {
    id?: string;
    fullName?: string;
    email?: string;
    role?: 'Administrator' | 'Publisher';
    isActive?: boolean;
}

@Injectable()
export class UserService {
    getUsersData() {
        return [
            { id: '1', fullName: 'Carlos Mendoza', email: 'carlos.mendoza@example.com', role: 'Administrator', isActive: true },
            { id: '2', fullName: 'Ana Torres', email: 'ana.torres@example.com', role: 'Publisher', isActive: true },
            { id: '3', fullName: 'Luis García', email: 'luis.garcia@example.com', role: 'Publisher', isActive: false },
            { id: '4', fullName: 'Marta Pérez', email: 'marta.perez@example.com', role: 'Administrator', isActive: true },
            { id: '5', fullName: 'Juan López', email: 'juan.lopez@example.com', role: 'Publisher', isActive: true },
            { id: '6', fullName: 'Lucía Romero', email: 'lucia.romero@example.com', role: 'Publisher', isActive: false },
            { id: '7', fullName: 'Pedro Martínez', email: 'pedro.martinez@example.com', role: 'Administrator', isActive: true },
            { id: '8', fullName: 'Sofía Herrera', email: 'sofia.herrera@example.com', role: 'Publisher', isActive: true },
            { id: '9', fullName: 'Jorge Ramírez', email: 'jorge.ramirez@example.com', role: 'Publisher', isActive: true },
            { id: '10', fullName: 'Elena Suárez', email: 'elena.suarez@example.com', role: 'Administrator', isActive: false },
            { id: '11', fullName: 'Diego Ortiz', email: 'diego.ortiz@example.com', role: 'Publisher', isActive: true },
            { id: '12', fullName: 'Camila Flores', email: 'camila.flores@example.com', role: 'Publisher', isActive: true },
            { id: '13', fullName: 'Andrés Vega', email: 'andres.vega@example.com', role: 'Administrator', isActive: true },
            { id: '14', fullName: 'Valeria Castro', email: 'valeria.castro@example.com', role: 'Publisher', isActive: false },
            { id: '15', fullName: 'Héctor León', email: 'hector.leon@example.com', role: 'Publisher', isActive: true },
            { id: '16', fullName: 'Paula Rivas', email: 'paula.rivas@example.com', role: 'Administrator', isActive: true },
            { id: '17', fullName: 'Fernando Aguirre', email: 'fernando.aguirre@example.com', role: 'Publisher', isActive: true },
            { id: '18', fullName: 'Natalia Reyes', email: 'natalia.reyes@example.com', role: 'Publisher', isActive: false },
            { id: '19', fullName: 'Santiago Molina', email: 'santiago.molina@example.com', role: 'Administrator', isActive: true },
            { id: '20', fullName: 'Isabella Méndez', email: 'isabella.mendez@example.com', role: 'Publisher', isActive: true },
            { id: '21', fullName: 'Manuel Vargas', email: 'manuel.vargas@example.com', role: 'Publisher', isActive: true },
            { id: '22', fullName: 'Gabriela Lara', email: 'gabriela.lara@example.com', role: 'Administrator', isActive: false },
            { id: '23', fullName: 'Sebastián Peña', email: 'sebastian.pena@example.com', role: 'Publisher', isActive: true },
            { id: '24', fullName: 'Daniela Cárdenas', email: 'daniela.cardenas@example.com', role: 'Publisher', isActive: true },
            { id: '25', fullName: 'Tomás Delgado', email: 'tomas.delgado@example.com', role: 'Administrator', isActive: true },
            { id: '26', fullName: 'Renata Navarro', email: 'renata.navarro@example.com', role: 'Publisher', isActive: false },
            { id: '27', fullName: 'Álvaro Núñez', email: 'alvaro.nunez@example.com', role: 'Publisher', isActive: true },
            { id: '28', fullName: 'Mariana Salazar', email: 'mariana.salazar@example.com', role: 'Administrator', isActive: true },
            { id: '29', fullName: 'Rodrigo Figueroa', email: 'rodrigo.figueroa@example.com', role: 'Publisher', isActive: true },
            { id: '30', fullName: 'Julia Campos', email: 'julia.campos@example.com', role: 'Publisher', isActive: true }
        ];
    }

    roles: string[] = ['Administrator', 'Publisher'];

    constructor(private http: HttpClient) {}

    getUsers() {
        return Promise.resolve(this.getUsersData());
    }
}
