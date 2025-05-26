import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'principal', component: PaginaPrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path:'**', redirectTo: 'full' }
];
