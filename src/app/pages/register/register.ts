import {Component, inject, signal} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {IonButton, IonInput} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonButton
  ]
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  private passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const cp = group.get('confirmPassword')?.value;
    return pw && cp && pw !== cp ? { passwordsMismatch: true } : null;
  }

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatch },
  );

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { name, email, password } = this.form.getRawValue();

    let uid: string;
    try {
      uid = await this.authService.register(email, password);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'El registro falló');
      this.loading.set(false);
      return;
    }

    try {
      await this.userService.create({ name, email, description: '', profileSrc: '' }, uid);
    } catch (e: unknown) {
      try {
        await this.authService.deleteCurrentUser();
      } catch {
      }
      this.error.set(
        e instanceof Error ? e.message : 'No se pudo crear el perfil. Intenta de nuevo.',
      );
      this.loading.set(false);
      return;
    }

    try {
      await this.router.navigate(['update', uid], { queryParams: { fromRegister: 1 } });
    } finally {
      this.loading.set(false);
    }
  }
}
