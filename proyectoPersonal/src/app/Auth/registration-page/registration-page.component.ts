import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['../../shared/Css/auth.shared.css']
})
export class RegisterComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  registerError: string | null = null;

  onRegister() {
    if (this.authService.isRegisterFormValid()) {
      this.authService.register().subscribe({
        next: (response) => {
          this.registerError = null;
          // Redirigir al login o principal después del registro exitoso
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.registerError = 'Error al registrar usuario. Inténtalo de nuevo.';
        }
      });
    } else {
      this.registerError = 'Por favor, completa correctamente todos los campos.';
    }
  }
}