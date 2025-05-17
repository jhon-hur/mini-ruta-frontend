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
import { MiniLine, MiniLineService } from '../service/mini-line.service';
import { Place, PlaceService } from '../service/place.service';
import { InputSwitchModule } from 'primeng/inputswitch';

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
    selector: 'app-mini-lines',
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
        InputSwitchModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <h3>Lista de Línea de minis</h3>
            </ng-template>

            <ng-template #end>
                <p-button label="Nueva Línea de Mini" icon="pi pi-plus" severity="primary" class="mr-2" (onClick)="openNew()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="places()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['numberLine', 'line','background','isActive']"
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
                    <th style="min-width: 16rem">Horario</th>
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
                    <td style="text-align: center;">{{ product.numberLine }}</td>
                    <td style="text-align: center;">
                        <p-tag [value]="product.line" [severity]="getBackgroundColor(product.line)" />
                    </td>
                    <td style="text-align: center;">
                        <p-tag [value]="product.background" [severity]="getBackgroundColor(product.background)" />
                    </td>
                    <td style="min-width: 16rem">{{ product.hours }}</td>
                    <td>
                        <p-tag value="{{ product.isActive ? 'Activo' : 'Inactivo' }}" [severity]="getSeverity(product.isActive)" />
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editPlace(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deletePlace(product)" />
                        <p-button icon="pi pi-map" severity="info" [rounded]="true" [outlined]="true" (click)="showPlace(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="placeDialog" [style]="{ width: '450px' }" header="Crear/Actualizar Línea de Mini" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-4">
                            <label for="price" class="block font-bold mb-3">Frecuencia de Salida</label>
                            <p-inputnumber id="quantity" [showButtons]="true" [(ngModel)]="place.numberLine" fluid />
                        </div>
                        <div class="col-span-4">
                            <label for="quantity" class="block font-bold mb-3">Color de Línea</label>
                             <p-select [(ngModel)]="place.line" inputId="inventoryStatus" [options]="roles" [appendTo]="'body'" optionLabel="label" optionValue="label" placeholder="Seleccciona una linea" fluid />
                        </div>
                         <div class="col-span-4">
                            <label for="quantity" class="block font-bold mb-3">Fondo</label>
                             <p-select [(ngModel)]="place.background" inputId="inventoryStatus" [options]="roles" [appendTo]="'body'" optionLabel="label" optionValue="label" placeholder="Selecccione un Fondo" fluid />
                        </div>
                    </div>
                   
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Frecuencia de Salida</label>
                            <input type="text" pInputText id="name" [(ngModel)]="place.frequency" required autofocus fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="quantity" class="block font-bold mb-3">Link de la ruta</label>
                            <input type="text" pInputText id="name" [(ngModel)]="place.linkPath" required autofocus fluid />
                        </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Aceptar" icon="pi pi-check" (click)="savePlace()" />
            </ng-template>
        </p-dialog>

        <p-dialog [(visible)]="placeDialogShow" [style]="{ width: '50rem' }"
    [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" header="Crear/Actualizar Ruta del Mini" [modal]="true">
            <ng-template #content>
                <p-table
            #dt
            [value]="places2()"
            [rows]="10"
            [columns]="cols2"
            [paginator]="true"
            [globalFilterFields]="['name', 'isActive']"
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
                    <th  style="width: 50%;" pSortableColumn="name">
                        Nombre del Lugar
                        <p-sortIcon field="name" />
                    </th>
                    <th></th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 50%;">{{ product.name }}</td>
                    <td style="width: 50%;">
                     <p-inputSwitch ariaLabelledBy="switch2" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialogShow()" />
                <p-button label="Aceptar" icon="pi pi-check" (click)="hideDialogShow()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '650px' }" />
    `,
    providers: [MessageService, MiniLineService, PlaceService, FormsModule, ConfirmationService]
})
export class MiniLines implements OnInit {
    placeDialog: boolean = false;
    placeDialogShow: boolean = false;

    places = signal<MiniLine[]>([]);

    places2 = signal<Place[]>([]);

    place!: MiniLine;

    checked: boolean = false;

    selectedPlaces!: MiniLine[] | null;

    submitted: boolean = false;

    roles!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];
    exportColumns2!: ExportColumn[];


    cols!: Column[];
    cols2!: Column[];

    constructor(
        private placeService: MiniLineService,
        private placeService2: PlaceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
        this.loadDemoData2();
    }

    loadDemoData() {
        this.placeService.getMiniLines().then((data: any) => {
            this.places.set(data);
        });

        this.roles = [
            { label: 'Verde', value: 'Verde' },
            { label: 'Rojo', value: 'Rojo' },
            { label: 'Celeste', value: 'Celeste' }
        ];

        this.cols = [
            { field: 'id', header: 'Nro.' },
            { field: 'numberLine', header: 'Nombre' },
            { field: 'line', header: 'Linea' },
            { field: 'background', header: 'Fondo' },
            { field: 'isActive', header: 'Estado' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    loadDemoData2() {
        this.placeService2.getPlaces().then((data: any) => {
            this.places2.set(data);
        });

        this.cols2 = [
            { field: 'id', header: 'Nro.' },
            { field: 'name', header: 'Nombre' },
            { field: 'isActive', header: 'Estado' }
        ];

        this.exportColumns2 = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.place = {};
        this.submitted = false;
        this.placeDialog = true;
    }

    editPlace(place: MiniLine) {
        this.place = { ...place };
        this.placeDialog = true;
    }

    showPlace(place: MiniLine) {
        this.place = { ...place };
        this.placeDialogShow = true;
    }

    hideDialogShow() {
        this.placeDialogShow = false;
        this.submitted = false;
    }

    hideDialog() {
        this.placeDialog = false;
        this.submitted = false;
    }

    deletePlace(place: MiniLine) {
        this.confirmationService.confirm({
            message: `¿Seguro que deseas eliminar ${place.numberLine} - ${place.line}, fondo: ${place.background} ?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.places.set(this.places().filter((p) => p.id !== place.id));
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

    savePlace() {
        this.submitted = true;
        let _places = this.places();
        if (this.place.numberLine?.trim()) {
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
