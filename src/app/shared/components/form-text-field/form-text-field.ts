import {Component} from '@angular/core';

@Component({
  selector: 'form-text-field',
  templateUrl: './form-text-field.html',
  styleUrl: './form-text-field.css',
})
export class FormTextField {

}
/*function consume(data) {
  data = data["form-text-field"];
  Promise.all([
    loadContentFor(".display", "textContent", data, "display"),
    loadContentFor(".text-field", "placeholder", data, "placeholder"),
  ]).catch((error) => console.error("Error:", error));
}*/
