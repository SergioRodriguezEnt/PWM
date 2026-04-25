import {Component, inject} from '@angular/core';
import {FormTextField} from '../../shared/components/form-text-field/form-text-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    FormTextField,
    ReactiveFormsModule
  ]
})
export class Login{
  errorMessage = '';
  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit() {
    if (this.loginForm.invalid) return;
    try {
      const { email, password } = this.loginForm.getRawValue();
      await this.authService.login(email, password);
      await this.router.navigate(['/search']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
