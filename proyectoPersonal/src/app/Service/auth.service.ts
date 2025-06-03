import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient){}

  url = 'http://localhost:8080/user';
  
  // Estado reactivo común
  nombre = signal('');
  apellido = signal('');
  email = signal('');
  password = signal('');
  showPassword = signal(false);

  // Validaciones computadas
  isEmailValid = computed(() => this.validateEmail(this.email()));
  passwordStrength = computed(() => this.validatePassword(this.password()));

  // Validación para registro
  isRegisterFormValid = computed(() =>
    this.nombre().trim().length > 0 &&
    this.apellido().trim().length > 0 &&
    this.isEmailValid() &&
    this.passwordStrength().valid
  );

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password: string) {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      valid: hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      requirements: [
        { text: 'Mínimo 8 caracteres', valid: hasMinLength },
        { text: 'Al menos una mayúscula', valid: hasUppercase },
        { text: 'Al menos una minúscula', valid: hasLowercase },
        { text: 'Al menos un número', valid: hasNumber },
        { text: 'Al menos un carácter especial', valid: hasSpecialChar }
      ]
    };
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }
//peticiones HTTP

  login(): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      email: this.email(),
      password: this.password()
    });
  }

  register(): Observable<any> {
    return this.http.post(this.url, {
      nombre: this.nombre(),
      apellido: this.apellido(),
      email: this.email(),
      password: this.password()
    });
  }
}