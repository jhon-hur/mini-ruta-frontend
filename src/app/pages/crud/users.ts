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
import { User, UserService } from '../service/user.service';

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
    selector: 'app-usuarios',
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
        ConfirmDialogModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <h3>Lista de Usuarios</h3>
            </ng-template>

            <ng-template #end>
                <p-button label="Nuevo Usuario" icon="pi pi-plus" severity="primary" class="mr-2" (onClick)="openNew()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="users()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['fullName', 'email', 'role', 'isActive']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedUsers"
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
                    <th style="min-width: 16rem">Nro.</th>
                    <th pSortableColumn="fullName" style="min-width:16rem">
                        Nombre Completo
                        <p-sortIcon field="fullName" />
                    </th>
                    <th pSortableColumn="email" style="min-width: 8rem">
                        Email
                        <p-sortIcon field="email" />
                    </th>
                    <th pSortableColumn="role" style="min-width:10rem">
                        Rol
                        <p-sortIcon field="role" />
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
                    <td style="min-width: 12rem">{{ product.id }}</td>
                    <td style="min-width: 16rem">{{ product.fullName }}</td>
                    <td>{{ product.email }}</td>
                    <td>{{ product.role }}</td>
                    <td>
                        <p-tag value="{{product.isActive? 'Activo': 'Inactivo'}}" [severity]="getSeverity(product.isActive)" />
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editUser(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteUser(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="userDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="name" class="block font-bold mb-3">Nombre Completo</label>
                        <input type="text" pInputText id="name" [(ngModel)]="user.fullName" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !user.fullName">Name is required.</small>
                    </div>
                    <div>
                        <label for="description" class="block font-bold mb-3">Email</label>
                        <input type="email" pInputText id="name" [(ngModel)]="user.email" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !user.email">Name is required.</small>
                    </div>

                    <div>
                        <label for="inventoryStatus" class="block font-bold mb-3">Rol</label>
                        <p-select [(ngModel)]="user.role" inputId="inventoryStatus" [options]="roles" [appendTo]="'body'" optionLabel="label" optionValue="label" placeholder="Seleccciona un rol" fluid />
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Aceptar" icon="pi pi-check" (click)="saveUser()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, UserService, ConfirmationService]
})
export class Users implements OnInit {
    userDialog: boolean = false;

    users = signal<User[]>([]);

    user!: User;

    selectedUsers!: User[] | null;

    submitted: boolean = false;

    roles!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private userService: UserService,
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
        this.userService.getUsers().then((data: any) => {
            this.users.set(data);
        });

        this.roles = [
            { label: 'Administrator', value: 'Administrator' },
            { label: 'Publisher', value: 'Publisher' }
        ];

        this.cols = [
            { field: 'id', header: 'Nro.' },
            { field: 'fullName', header: 'Nombre Completo' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Rol' },
            { field: 'isActive', header: 'Estado' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => val.id !== user.id));
                this.user = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuario Eliminado',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users().length; i++) {
            if (this.users()[i].id === id) {
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

    saveUser() {
        this.submitted = true;
        let _users = this.users();
        if (this.user.fullName?.trim()) {
            if (this.user.id) {
                _users[this.findIndexById(this.user.id)] = this.user;
                this.users.set([..._users]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuario Actualizado',
                    life: 3000
                });
            } else {
                this.user.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuario Creado',
                    life: 3000
                });
                this.users.set([..._users, this.user]);
            }

            this.userDialog = false;
            this.user = {};
        }
    }
}
