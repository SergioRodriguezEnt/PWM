import {Component, output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SearchBar {
  query = new FormControl('', { nonNullable: true });
  search = output<string>();

  submit() {
    this.search.emit(this.query.value.trim());
  }
}

