import {Component, signal} from "@angular/core";

@Component({
  selector: 'outfit-upload-form',
  templateUrl: './outfit-upload-form.html',
  styleUrl: './outfit-upload-form.css'
})
export class OutfitUploadForm{
}

/*async function loadOutfitUploadForm(data) {
  Promise.all([
    loadContentFor(".upload-form-h3", "textContent", data, "title"),
    loadContentFor("#outfit-img", "src", data["outfit-img-btn"], "src"),
    loadContentFor("#outfit-img", "alt", data["outfit-img-btn"], "alt"),
    loadContentForField("outfit-name-field", data),
    loadContentForField("outfit-description-field", data),
    loadContentFor("#upload-button", "textContent", data, "upload-form-button"),
  ]).catch(console.error);
}

async function setupUploadForm() {}
*/
