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
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)" novalidate>
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="assets/images/logo.png" alt="MiniRuta" class="w-32 h-auto mx-auto" />
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bienvenido a Mini Ruta Oruro</div>
                            <span class="text-muted-color font-medium">Login</span><br>
							<span *ngIf="showPasswordStep"class="text-muted-color font-medium">{{email}}</span>
                        </div>

                        <!-- Paso 1: solo email -->
                        <div *ngIf="!showPasswordStep">
                            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email" name="email" type="email" [(ngModel)]="email" #emailModel="ngModel" required email placeholder="Email" class="w-full mb-2" />

                            <div *ngIf="emailModel.invalid && emailModel.touched" class="text-red-500 text-sm mb-2">
                                <div *ngIf="emailModel.errors?.['required']">El email es obligatorio.</div>
                                <div *ngIf="emailModel.errors?.['email']">Formato de email inválido.</div>
                            </div>
                            <p-button label="Continuar" styleClass="w-full" type="button" (click)="checkEmail(emailModel)"></p-button>
                            <div *ngIf="emailNotFound" class="text-red-500 mt-2 text-center text-sm">Correo no registrado.</div>

							<p-button label="Cancelar" styleClass="w-full mt-2 p-button-secondary" type="button" (click)="passenger()"></p-button>
                        </div>

                        <!-- Paso 2: password + login -->
                        <div *ngIf="showPasswordStep">
                            <label for="password" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Contraseña</label>
                            <p-password id="password" name="password" [(ngModel)]="password" #passwordModel="ngModel" required placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                            <div *ngIf="passwordModel.invalid && passwordModel.touched" class="text-red-500 text-sm mb-2">La contraseña es obligatoria.</div>

                            <p-button label="Iniciar sesión" styleClass="w-full" type="submit" [disabled]="loginForm.invalid"></p-button>
                            <div *ngIf="loginError" class="text-red-500 mt-2 text-center">Credenciales incorrectas. Intenta de nuevo.</div>

                            <p-button label="Cancelar" styleClass="w-full mt-2 p-button-secondary" type="button" (click)="cancelar()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form> `
})
export class Login {
    private router = inject(Router);

    email: string = '';
    password: string = '';
    showPasswordStep: boolean = false;
    loginError: boolean = false;
    emailNotFound: boolean = false;

    validUsers = [
        { email: 'admin@gmail.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' },
        { email: 'user3@example.com', password: 'password3' }
    ];

    checkEmail(emailModel: NgModel) {
        if (emailModel.valid) {
            const exists = this.validUsers.some((user) => user.email === this.email);
            if (exists) {
                this.emailNotFound = false;
                this.showPasswordStep = true;
            } else {
                this.emailNotFound = true;
            }
        } else {
            emailModel.control.markAsTouched();
        }
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const user = this.validUsers.find((user) => user.email === this.email && user.password === this.password);

            if (user) {
                this.loginError = false;
                this.router.navigateByUrl('/dashboard');
            } else {
                this.loginError = true;
            }
        }
    }

    cancelar() {
        this.showPasswordStep = false;
        this.password = '';
        this.email = '';
        this.loginError = false;
    }

	passenger(){
		 this.router.navigateByUrl('/');
	}
}
