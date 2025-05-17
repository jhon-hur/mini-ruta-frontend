import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Report, ReportService } from '../service/comments.service';
import { EditorModule } from 'primeng/editor';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        EditorModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <h3>Lista de Comentarios</h3>
            </ng-template>

            <ng-template #end>
                <p-button label="Nuevo Comentario" icon="pi pi-plus" severity="primary" class="mr-2" (onClick)="openNew()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="places()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['comment', 'score','isActive']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedPlaces"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0"></h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th>Nro.</th>
                    <th pSortableColumn="comment" style="min-width:16rem">
                        Contenido
                        <p-sortIcon field="comment" />
                    </th>
                    <th pSortableColumn="score" style="min-width: 12rem">
                        Puntaje
                        <p-sortIcon field="score" />
                    </th>
                    <th pSortableColumn="datePublished" style="min-width:16rem">
                        Fecha Publicada del Lugar
                        <p-sortIcon field="datePublished" />
                    </th>
                    <th style="min-width: 12rem" pSortableColumn="numberLine">
                        Numero de Línea
                        <p-sortIcon field="numberLine" />
                    </th>
                    <th pSortableColumn="line" style="min-width: 12rem">
                        Color de Línea
                        <p-sortIcon field="line" />
                    </th>
                    <th pSortableColumn="background" style="min-width: 12rem">
                        Fondo
                        <p-sortIcon field="background" />
                    </th>
                    <th pSortableColumn="isActive" style="min-width: 12rem">
                        Estado
                        <p-sortIcon field="isActive" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td>{{ product.id }}</td>
                    <td style="min-width: 16rem" [innerHTML]="product.comment"></td>
                    <td style="min-width: 12rem">{{ product.score }} ★</td>
                    <td style="min-width: 12rem">{{ product.datePublished }}</td>
                    <td style="text-align: center;">{{ product.numberLine }}</td>
                    <td style="text-align: center;">
                        <p-tag [value]="product.line" [severity]="getBackgroundColor(product.line)" />
                    </td>
                    <td style="text-align: center;">
                        <p-tag [value]="product.background" [severity]="getBackgroundColor(product.background)" />
                    </td>
                    <td>
                        <p-tag value="{{product.isActive? 'Activo': 'Inactivo'}}" [severity]="getSeverity(product.isActive)" />
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editPlace(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deletePlace(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="placeDialog" [style]="{ width: '450px' }" header="Crear/Actulizar Lugar" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <p-rating [(ngModel)]="place.score" />
                    </div>
                    <div>
                        <p-editor [(ngModel)]="place.comment" [style]="{ height: '200px' }" />
                        <small class="text-red-500" *ngIf="submitted && !place.comment">Name is required.</small>
                    </div>
                    <hr>
                    <input pInputText class="w-full mb-4" type="text" placeholder="Buscar por Línea de Mini" />
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Aceptar" icon="pi pi-check" (click)="savePlace()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, ReportService, ConfirmationService]
})
export class Comments implements OnInit {
    placeDialog: boolean = false;

    places = signal<Report[]>([]);

    place!: Report;

    selectedPlaces!: Report[] | null;

    submitted: boolean = false;

    roles!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private placeService: ReportService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.placeService.getMiniLines().then((data: any) => {
            this.places.set(data);
        });

        this.roles = [
            { label: 'Administrator', value: 'Administrator' },
            { label: 'Publisher', value: 'Publisher' }
        ];

        this.cols = [
            { field: 'id', header: 'Nro.' },
            { field: 'comment', header: 'comment' },
            { field: 'score', header: 'score' },
            { field: 'isActive', header: 'Estado' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.place = {};
        this.submitted = false;
        this.placeDialog = true;
    }

    editPlace(place: Report) {
        this.place = { ...place };
        this.placeDialog = true;
    }

    hideDialog() {
        this.placeDialog = false;
        this.submitted = false;
    }

    deletePlace(place: Report) {
        this.confirmationService.confirm({
            message: `¿Seguro que deseas eliminar ${place.comment}?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.places.set(this.places().filter(p => p.id !== place.id));
                this.place = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Lugar eliminado',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.places().length; i++) {
            if (this.places()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getBackgroundColor(background: string): string {
        switch (background.toLowerCase()) {
            case 'celeste':
                return 'info'; // celeste
            case 'verde':
                return 'success'; // verde
            case 'rojo':
                return 'danger'; // rojo
            default:
                return '#9E9E9E'; // gris por defecto
        }
    }

    savePlace() {
        this.submitted = true;
        let _places = this.places();
        if (this.place.comment?.trim()) {
            if (this.place.id) {
                _places[this.findIndexById(this.place.id)] = this.place;
                this.places.set([..._places]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuario Actualizado',
                    life: 3000
                });
            } else {
                this.place.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuario Creado',
                    life: 3000
                });
                this.places.set([..._places, this.place]);
            }

            this.placeDialog = false;
            this.place = {};
        }
    }
}
