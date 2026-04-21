import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'form-text-field',
  templateUrl: './form-text-field.html',
  imports: [FormsModule],
  styleUrl: './form-text-field.css'
})
export class FormTextField {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(val: string) {
    this.valueChange.emit(val);
  }
}
/*function consume(data) {
  data = data["form-text-field"];
  Promise.all([
    loadContentFor(".display", "textContent", data, "display"),
    loadContentFor(".text-field", "placeholder", data, "placeholder"),
  ]).catch((error) => console.error("Error:", error));
}*/
