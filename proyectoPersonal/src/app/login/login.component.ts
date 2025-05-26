import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email: string ='';
password: string ='';
emailError: string | null = null;
passwordError: string | null = null;
showPassword: boolean = false;

constructor(private router: Router){}

 hasMinLength(): boolean {
    return this.password.length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.password);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }

  validateEmail(): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(this.email);
    this.emailError = isValid ? null : 'Correo electrónico no válido';
    return isValid;
  }

  validatePassword(): boolean {
    const errors = [];
    
    if (!this.hasMinLength()) errors.push('Mínimo 8 caracteres');
    if (!this.hasUppercase()) errors.push('Al menos una mayúscula');
    if (!this.hasLowercase()) errors.push('Al menos una minúscula');
    if (!this.hasNumber()) errors.push('Al menos un número');
    if (!this.hasSpecialChar()) errors.push('Al menos un carácter especial');

    this.passwordError = errors.length ? errors.join(', ') : null;
    return errors.length === 0;
  }

  onSubmit(): void {
    if (this.validateEmail() && this.validatePassword()) {
      this.router.navigate(['/principal']);
    } else {
      this.passwordError = 'Credenciales incorrectas';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}