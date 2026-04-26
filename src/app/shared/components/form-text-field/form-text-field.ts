import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

let nextID = 0;

@Component({
  selector: 'form-text-field',
  templateUrl: './form-text-field.html',
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './form-text-field.css'
})
export class FormTextField {
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;

  readonly selfId = `${this.id}-${nextID++}`;
}
