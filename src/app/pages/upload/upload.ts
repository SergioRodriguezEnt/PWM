import {Component, signal} from "@angular/core";
import {OutfitUploadForm} from './outfit-upload-form';
import {SideBar} from '../../shared/components/side-bar/side-bar';
import {BottomBar} from '../../shared/components/bottom-bar/bottom-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.html',
  imports: [
    OutfitUploadForm,
    SideBar,
    BottomBar
  ]
})
export class Upload{
}

/*async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/templates/json/outfit-upload-form.json",
      loadOutfitUploadForm,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar(), setupUploadForm()]).catch(console.error);
}
*/
