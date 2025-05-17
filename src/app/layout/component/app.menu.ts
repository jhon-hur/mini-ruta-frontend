import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [   
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/dashboard/pages/users']
                    },
                    {
                        label: 'Lugares',
                        icon: 'pi pi-fw pi-map',
                        routerLink: ['/dashboard/pages/places']
                    },
                    {
                        label: 'Minis',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/dashboard/pages/minis']
                    },
                    {
                        label: 'Comentarios',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/dashboard/pages/comentarios']
                    },
                    {
                        label: 'Reportes',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/dashboard/pages/reportes']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    }
                ]
            },
        ];
    }
}
