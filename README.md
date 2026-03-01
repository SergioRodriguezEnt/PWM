# Outfitera
### El objetivo de esta web es proporcionar una red social dedicada a outfits, donde los usuarios puedan ver, guardar y compartir sus outfits favoritos para cualquier estilo y ocasión.
### Los usuarios pueden explorar combinaciones de ropa creadas por la comunidad, inspirarse con nuevas tendencias y organizar sus looks favoritos en un solo lugar.
### Diseñado por:
##### Helen González Báez
##### Roberto Rodríguez Guillén
##### Sergio Rodríguez Rubio
---

## Requisitos del proyecto:
* Deben haber 3 niveles de usuarios con una jerarquía de permisos progresiva.
* Los usuarios sin registrarse podrán ver y compartir outfits.
* Los usuarios registrados podrán subir y guardar outfits.
* Los usuarios registrados podrán ver otros perfiles y personalizar los suyos.
* Los usuarios registrados podrán interactuar con los outfits añadiendo comentarios/likes.
* Los usuarios administradores serán capaces de tomar acciones contra contenido inadecuado y cuentas que no cumplan con la normativa.
---

## Mockups y páginas
Los mockups se encuentran en `/src/mockups` y las páginas en `/src/pages`. <br>
A continuación se muestran los mockups, seguidos de las páginas correspondientes:
* `home.png` - - - - - - - - - - - - - - - - - - - - ---> `home.html`
* `createProfile.png` - - - - - - - - - - - - - ---> `register.html`
* `login.png` - - - - - - - - - - - - - - - - - - - - ---> `login.html`
* `noLoginSearch.png` - - - - - - - - - - - - - ---> `search-no-user.html`
* `noLoginOutfitView.png` - - - - - - - - - - ---> `outfit-no-user.html`
* `loginSearch.png` - - - - - - - - - - - - - - - ---> `search-with-user.html`
* `loginOutfitView.png` - - - - - - - - - - - - ---> `outfit-with-user.html`
* `withoutPermissionsProfileView.png` - ---> `profile-no-permission.html`
* `withPermissionsProfileView.png` - - - ---> `profile-with-permission.html`
* `profileUpdate.png` - - - - - - - - - - - - - ---> `update.html`
* `outfitUpload.png` - - - - - - - - - - - - - - ---> `upload.html`
---

### Templates
Los templates se encuentran en `/src/templates` y los archivos están divididos en las carpetas `/css` y `/html` según el tipo de archivo. <br>
A continuación se muestran los templates junto con las páginas en las que se usan.
* `top-bar.html` - - - - - - - - - ---> `home.html`, `login.html`, `outfit-no-user.html`, `register.html`, `search-no-user.html`
* `side-bar.html` - - - - - - - - ---> `outfit-with-user.html`, `profile-no-permission.html`, `profile-with-permission.html`, `search-with-user.html`, `update.html`, `upload.html`
* `bottom-bar.html` - - - - - - - ---> **`todas las páginas`**
* `search-bar.html` - - - - - - - ---> `home.html`, `outfit-no-user.html`, `outfit-with-user.html`, `search-no-user.html`, `search-with-user.html`
* `login-form.html` - - - - - - - ---> `login.html`
* `register-form.html` - - - - - ---> `register.html`
* `outfit-upload-form.html` - ---> `upload.html`
* `edit-profile-form.html` - - ---> `update.html`
* `form-text-field` - - - - - - - - ---> `edit-profile-form.html`, `login-form.html`, `outfit-upload-form.html`, `register-form.html`
* `outfit-view.html` - - - - - - - ---> `outfit-no-user.html`, `outfit-with-user.html`
* `profile-photo.html` - - - - - ---> `outfit-with-user.html`, `profile-no-permission.html`, `search-with-user.html`
* `search-results.html` - - - - ---> `home.html`, `profile-no-permission.html`, `profile-with-permission.html`, `search-with-user.html`, `search-no-user.html`