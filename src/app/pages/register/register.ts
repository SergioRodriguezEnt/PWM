import {Component, inject} from '@angular/core';
import {FormTextField} from '../../shared/components/form-text-field/form-text-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/user.service';
import {firstValueFrom} from 'rxjs';

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
  registerForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    confirmPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });
  errorMessage = '';

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  async onSubmit() {
    if (this.registerForm.invalid) return;
    const { username, email, password, confirmPassword } = this.registerForm.getRawValue();
    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      const credential = await this.authService.register(email, password);
      const uid = credential.user.uid;
      await firstValueFrom(this.userService
        .createUser(uid, {email: email, name: username, description: "", profilePhotoSrc: "", role: "user"}))
      await this.router.navigate(['/update']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
