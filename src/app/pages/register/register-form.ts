import { Component, inject } from '@angular/core';
import { FormTextField } from '../../shared/components/form-text-field/form-text-field';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  imports: [
    FormTextField,
    FormsModule
  ]
})
export class RegisterForm {
  credentials = { username: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.authService.register(
        this.credentials.email,
        this.credentials.password
      );
      this.router.navigate(['/search']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
