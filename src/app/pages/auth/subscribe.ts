import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-subscribe',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `<form #registerForm="ngForm" (ngSubmit)="onRegister(registerForm)" novalidate>
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="assets/images/logo.png" alt="MiniRuta" class="w-32 h-auto mx-auto" />
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Crea tu cuenta</div>
                            <span class="text-muted-color font-medium">Suscríbete para empezar</span>
                        </div>

                        <!-- Campo: Nombre -->
                        <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nombre</label>
                        <input pInputText id="name" name="name" type="text" [(ngModel)]="name" #nameModel="ngModel" required placeholder="Tu nombre" class="w-full md:w-[30rem] mb-4"/>
                        <div *ngIf="nameModel.invalid && nameModel.touched" class="text-red-500 text-sm mb-2">El nombre es obligatorio.</div>

                        <!-- Campo: Email -->
                        <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <input pInputText id="email" name="email" type="email" [(ngModel)]="email" #emailModel="ngModel" required email placeholder="Email" class="w-full md:w-[30rem] mb-4"/>
                        <div *ngIf="emailModel.invalid && emailModel.touched" class="text-red-500 text-sm mb-2">
                            <div *ngIf="emailModel.errors?.['required']">El email es obligatorio.</div>
                            <div *ngIf="emailModel.errors?.['email']">Formato de email inválido.</div>
                        </div>

                        <!-- Campo: Contraseña -->
                        <label for="password" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Contraseña</label>
                        <p-password id="password" name="password" [(ngModel)]="password" #passwordModel="ngModel" required placeholder="Contraseña" styleClass="mb-4" [fluid]="true" [toggleMask]="true" [feedback]="false" />

                        <div *ngIf="passwordModel.invalid && passwordModel.touched" class="text-red-500 text-sm mb-2">La contraseña es obligatoria.</div>

                        <!-- Campo: Confirmar Contraseña -->
                        <label for="verifyPassword" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Confirmar Contraseña</label>
                        <p-password id="verifyPassword" name="verifyPassword" [(ngModel)]="verifyPassword" #verifyPasswordModel="ngModel" required placeholder="Repite tu contraseña" styleClass="mb-4" [fluid]="true" [toggleMask]="true" [feedback]="false" />
                        <div *ngIf="verifyPasswordModel.invalid && verifyPasswordModel.touched" class="text-red-500 text-sm mb-2">Repetir contraseña es obligatorio.</div>

                        <div *ngIf="password !== verifyPassword && verifyPasswordModel.touched" class="text-red-500 text-sm mb-2">Las contraseñas no coinciden.</div>

                        <!-- Botón Registrar -->
                        <p-button label="Registrarse" styleClass="w-full" type="submit" [disabled]="registerForm.invalid || password !== verifyPassword"></p-button>

                        <!-- Botón Cancelar -->
                        <p-button label="Cancelar" styleClass="w-full mt-2 p-button-secondary" type="button" (click)="cancelar()"></p-button>
                    </div>
                </div>
            </div>
        </div>
    </form> `
})
export class Subscribe {
    private router = inject(Router);

    name: string = '';
    email: string = '';
    password: string = '';
    verifyPassword: string = '';

    onRegister(form: NgForm) {
        if (form.valid && this.password === this.verifyPassword) {
             this.router.navigateByUrl('/auth/login');
            console.log('Datos del usuario:', {
                name: this.name,
                email: this.email,
                password: this.password
            });
        }
    }

     cancelar() {
        this.router.navigateByUrl('/auth/login');
    }
}
