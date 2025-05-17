import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'highlights-widget',
    imports: [InputTextModule, IconFieldModule, DividerModule, EditorModule, FormsModule, ButtonModule],
    template: `
        <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
            <div class="grid grid-cols-2 w-full px-4 py-2">
                <div class="text-left text-gray-800 font-medium">Bienvenido a Mini Rutas Oruro</div>
                <div class="text-right text-gray-800 font-medium">15 de mayo de 2025 - 19:45</div>
            </div>
            <hr />
            <div class="text-center pb-2">
                <input pInputText class="w-full" type="text" placeholder="Buscar por Línea de Mini..." />
            </div>
            <div class="bg-purple-100 pt-4  rounded-lg">
                <!-- Título centrado -->
                <h2 class="text-xl font-bold text-center mb-4">Línea 101 Rojo Fondo Celeste</h2>
                <!-- Contenido en dos columnas alineadas a la derecha -->
                <div class="flex flex-col md:flex-row justify-between gap-6 text-sm md:text-base text-right">
                    <!-- Frecuencia (izquierda) -->
                    <div class="flex-1">
                        <p class="font-semibold mb-2 text-left">🚍 Frecuencia de salida:</p>
                        <ul class="list-disc list-inside space-y-1 text-left pl-2">
                            <li>Cada 30 minutos</li>
                        </ul>
                    </div>

                    <!-- Horarios (derecha) -->
                    <div class="flex-1">
                        <p class="font-semibold mb-2 text-left">🕒 Horarios de Trabajo:</p>
                        <ul class="list-disc list-inside space-y-1 text-left">
                            <li>Lunes a Sábado: 06:00 - 18:30</li>
                            <li>Domingo: 06:00 - 16:30</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-4 mt-20 pb-20">
                <!-- Columna Izquierda: Mapa -->
                <div class="col-span-12 lg:col-span-6 bg-purple-100 rounded-lg flex justify-center items-center">
                    <iframe src="https://www.google.com/maps/d/embed?mid=1vE7hXFXtAJBvc52ndsqQUAoxENud1Mo&hl=es&ehbc=2E312F" width="100%" height="100%" class="rounded-lg" style="border: none;"></iframe>
                </div>

                <!-- Columna Derecha: Info y Comentarios -->
                <div class="col-span-12 lg:col-span-6 flex flex-col gap-6 justify-between">
                    <!-- Ruta del Mini -->
                    <div class="bg-purple-100 p-4 rounded-lg">
                        <p class="text-xl font-semibold mb-2">📍 Ruta del Mini</p>
                        <input pInputText class="w-full mb-4" type="text" placeholder="Buscar lugares que recorre el mini..." />

                        <ul class="list-disc list-inside space-y-1 text-left">
                            <li>Challacollo</li>
                            <li>FNI Ciudadela Universitaria</li>
                            <li>Av. Dehene</li>
                            <li>Av. España</li>
                            <li>Mercado Campero</li>
                            <li>Parque de la Unión</li>
                            <li>Plaza Sebastián Pagador</li>
                            <li>Estadio Jesús Bermúdez</li>
                            <li>Casco del Minero</li>
                            <li>Aurora</li>
                        </ul>
                    </div>

                    <!-- Comentarios -->
                    <div class="bg-purple-100 p-4 rounded-lg">
                        <p class="text-xl font-semibold mb-2">💬 Comentarios</p>

                        <div class="mb-4">
                            <p class="text-sm text-gray-600">14/08/2025 - 08:15</p>
                            <p>★★★☆☆</p>
                            <p>Mini 101 Excelente servicio.</p>
                        </div>

                        <div>
                            <p class="text-sm text-gray-600">12/09/2025 - 08:15</p>
                            <p>★★☆☆☆</p>
                            <p>Tarda en llegar.</p>
                        </div>
                    </div>

                    <!-- Editor y botón -->
                    <div class="bg-purple-100 p-4 rounded-lg">
                        <p-editor [(ngModel)]="text" [style]="{ height: '200px' }"></p-editor>
                        <p-button styleClass="mt-4 w-full" label="Enviar Comentario" icon="pi pi-check"></p-button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HighlightsWidget {
    text: string | undefined;
}
