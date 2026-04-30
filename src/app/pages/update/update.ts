import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, take} from 'rxjs';
import {ProfilePhoto} from '../../shared/components/profile-photo/profile-photo';

@Component({
  selector: 'app-update',
  templateUrl: './update.html',
  styleUrl: './update.css',
  imports: [
    ReactiveFormsModule,
    ProfilePhoto
  ]
})
export class Update {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  fromRegister = toSignal(
    this.route.queryParamMap.pipe(map(q => q.get('fromRegister') === '1')),
    { initialValue: false },
  );

  private targetId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? '')),
    { initialValue: '' },
  );

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    profileSrc: [''],
  });

  profilePreview = toSignal(this.form.controls.profileSrc.valueChanges, {
    initialValue: '',
  });

  constructor() {
    effect(() => {
      const id = this.targetId();
      if (!id) return;

      this.userService
        .get(id)
        .pipe(take(1))
        .subscribe(u => {
          if (u) {
            this.form.patchValue({
              name: u.name ?? '',
              description: u.description ?? '',
              profileSrc: u.profileSrc ?? '',
            });
          }
          this.loading.set(false);
        });
    });
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.targetId();
    if (!id) return;

    this.saving.set(true);
    this.error.set(null);
    try {
      await this.userService.update(id, this.form.getRawValue());
      await this.router.navigate(['profile', id]);
    } catch (e: unknown) {
      this.error.set(
        e instanceof Error ? e.message : 'No se pudo guardar el perfil',
      );
    } finally {
      this.saving.set(false);
    }
  }

  async cancel() {
    if (this.fromRegister()) return;
    const id = this.targetId();
    await this.router.navigate(['profile', id]);
  }
}
