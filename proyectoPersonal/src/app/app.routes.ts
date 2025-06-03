import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/registration-page/registration-page.component';

export const routes: Routes = [
    {path: 'principal', component: PaginaPrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    { path: '**', redirectTo: 'login' }
];
