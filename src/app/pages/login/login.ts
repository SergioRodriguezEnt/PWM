import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {IonButton, IonInput} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonButton
  ]
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    try {
      const { email, password } = this.form.getRawValue();
      const uid = await this.authService.login(email, password);
      await this.router.navigate(['profile', uid]);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'El inicio de sesión falló');
    } finally {
      this.loading.set(false);
    }
  }
}
