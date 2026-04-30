import {Component, computed, effect, inject, signal} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {OutfitService} from '../../core/services/outfit.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, take} from 'rxjs';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class Upload {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private outfitService = inject(OutfitService);

  saving = signal(false);
  error = signal<string | null>(null);

  private editId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id'))),
    { initialValue: null },
  );
  isEdit = computed(() => !!this.editId());

  tags = signal<string[]>([]);
  tagInput = signal('');

  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    description: [''],
    src: ['', [Validators.required]],
  });

  preview = toSignal(this.form.controls.src.valueChanges, { initialValue: '' });

  constructor() {
    effect(() => {
      const id = this.editId();
      if (!id) return;

      this.outfitService
        .get(id)
        .pipe(take(1))
        .subscribe(o => {
          if (o) {
            this.form.patchValue({
              title: o.title,
              description: o.description,
              src: o.src,
            });
            this.tags.set([...(o.tags ?? [])]);
          }
        });
    });
  }

  onTagInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tagInput.set(target.value);
  }

  addTagFromInput() {
    const value = this.tagInput().trim();
    if (!value) return;
    if (!this.tags().includes(value)) {
      this.tags.update(curr => [...curr, value]);
    }
    this.tagInput.set('');
  }

  onTagKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTagFromInput();
    } else if (
      event.key === 'Backspace' &&
      this.tagInput() === '' &&
      this.tags().length
    ) {
      this.tags.update(curr => curr.slice(0, -1));
    }
  }

  removeTag(tag: string) {
    this.tags.update(curr => curr.filter(t => t !== tag));
  }

  async submit() {
    this.addTagFromInput();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    try {
      const editingId = this.editId();
      if (editingId) {
        await this.outfitService.update(editingId, {
          ...this.form.getRawValue(),
          tags: this.tags(),
        });
        await this.router.navigate(['outfit', editingId]);
      } else {
        const myId = this.authService.userId();
        if (!myId) {
          this.error.set('Debes estar con la sesión iniciada para subir.');
          return;
        }
        const newId = await this.outfitService.create({
          ...this.form.getRawValue(),
          tags: this.tags(),
          userId: myId,
        });
        await this.router.navigate(['outfit', newId]);
      }
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'No se pudo guardar el outfit.');
    } finally {
      this.saving.set(false);
    }
  }
}
