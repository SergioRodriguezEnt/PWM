import {Component, effect, input, output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonButton, IonInput} from '@ionic/angular/standalone';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonInput,
    IonButton
  ]
})
export class SearchBar {
  initial = input<string>('');

  query = new FormControl('', { nonNullable: true });
  search = output<string>();

  constructor() {
    effect(() => {
      const value = this.initial();
      if (value !== this.query.value) {
        this.query.setValue(value);
      }
    });
  }

  submit() {
    this.search.emit(this.query.value.trim());
  }
}

