import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Place {
    id?: string;
    name?: string;
    linkPlace?: string;
    isActive?: boolean;
}

@Injectable()
export class PlaceService {
    getPlacesData(): Place[] {
        return [
            { id: '1', name: 'Santuario del Socavón', linkPlace: 'https://es.wikipedia.org/wiki/Santuario_del_Socavón', isActive: true },
            { id: '2', name: 'Museo Minero del Socavón', linkPlace: 'https://es.wikipedia.org/wiki/Museo_Minero_del_Socav%C3%B3n', isActive: true },
            { id: '3', name: 'Cerro Pie de Gallo', linkPlace: '', isActive: true },
            { id: '4', name: 'Carnaval de Oruro', linkPlace: 'https://es.wikipedia.org/wiki/Carnaval_de_Oruro', isActive: true },
            { id: '5', name: 'Plaza 10 de Febrero', linkPlace: '', isActive: true },
            { id: '6', name: 'Iglesia de San Francisco', linkPlace: '', isActive: true },
            { id: '7', name: 'Museo Simón I. Patiño', linkPlace: '', isActive: true },
            { id: '8', name: 'Monumento a la Virgen del Socavón', linkPlace: '', isActive: true },
            { id: '9', name: 'Teatro Internacional de Oruro', linkPlace: '', isActive: true },
            { id: '10', name: 'Balneario de Obrajes', linkPlace: '', isActive: false },
            { id: '11', name: 'Laguna de Uru Uru', linkPlace: '', isActive: true },
            { id: '12', name: 'Complejo Ferroviario', linkPlace: '', isActive: true },
            { id: '13', name: 'Casa de la Cultura', linkPlace: '', isActive: true },
            { id: '14', name: 'Mercado Central de Oruro', linkPlace: '', isActive: true },
            { id: '15', name: 'Museo Antropológico Eduardo López Rivas', linkPlace: '', isActive: true },
            { id: '16', name: 'Mineral de Itos', linkPlace: '', isActive: true },
            { id: '17', name: 'Iglesia del Rosario', linkPlace: '', isActive: true },
            { id: '18', name: 'Teatro Palais Concert', linkPlace: '', isActive: true },
            { id: '19', name: 'Cine Teatro Gran Rex', linkPlace: '', isActive: true },
            { id: '20', name: 'Terminal de Trenes de Oruro', linkPlace: '', isActive: true },
            { id: '21', name: 'Estadio Jesús Bermúdez', linkPlace: '', isActive: true },
            { id: '22', name: 'Capilla de la Virgen del Socavón', linkPlace: '', isActive: true },
            { id: '23', name: 'Zona Minera San José', linkPlace: '', isActive: true },
            { id: '24', name: 'Parque Zoológico Andino', linkPlace: '', isActive: true },
            { id: '25', name: 'Zona Norte de Oruro', linkPlace: '', isActive: false },
            { id: '26', name: 'Universidad Técnica de Oruro (UTÓ)', linkPlace: '', isActive: true },
            { id: '27', name: 'Mirador Virgen del Socavón', linkPlace: '', isActive: true },
            { id: '28', name: 'Zona del Casco Viejo', linkPlace: '', isActive: true },
            { id: '29', name: 'Museo de Arte Sacro', linkPlace: '', isActive: true },
            { id: '30', name: 'Complejo Sajama (acceso desde Oruro)', linkPlace: 'https://es.wikipedia.org/wiki/Parque_nacional_Sajama', isActive: true }
        ];
    }

    constructor(private http: HttpClient) {}

    getPlaces(): Promise<Place[]> {
        return Promise.resolve(this.getPlacesData());
    }
}
