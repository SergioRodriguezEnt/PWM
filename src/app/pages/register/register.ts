import {Component, inject} from '@angular/core';
import {FormTextField} from '../../shared/components/form-text-field/form-text-field';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [
    FormTextField,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Register {
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
      await this.router.navigate(['/search']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
