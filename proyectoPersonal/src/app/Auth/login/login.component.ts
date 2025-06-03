import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/Css/auth.shared.css'] 
})
export class LoginComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  // Variables de estado
  emailError: string | null = null;
  passwordError: string | null = null;
  loginError: string | null = null;

  onSubmit(): void {
    this.emailError = this.authService.isEmailValid() ? null : 'Correo electrónico no válido';
    this.passwordError = this.authService.passwordStrength().valid ? null : 'La contraseña no cumple los requisitos';

    if (!this.emailError && !this.passwordError) {
      this.authService.login().subscribe({
        next: (response) => {
          // Aquí guardas token, info usuario, etc
          this.loginError = null;
          this.router.navigate(['/principal']);
        },
        error: (err) => {
          this.loginError = 'Credenciales incorrectas';
        }
      });
    }
  }
}