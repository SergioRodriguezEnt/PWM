# Outfitera
### El objetivo de esta web es proporcionar una red social dedicada a outfits, donde los usuarios puedan ver, guardar y compartir sus outfits favoritos para cualquier estilo y ocasión.
### Los usuarios pueden explorar combinaciones de ropa creadas por la comunidad, inspirarse con nuevas tendencias y organizar sus looks favoritos en un solo lugar.

### Componentes del grupo:
- Helen González Báez
- Roberto Rodríguez Guillén
- Sergio Rodríguez Rubio

---

# IMPORTANTE
### El directiorio raíz del proyecto se debe llamar PWM.

---

## Mockups Sprint 2 (Tablet y Móvil)

Los mockups de móvil se encuentran en `/src/mockups/smartphone/`.
Los mockups de tablet se encuentran en `/src/mockups/tablet/`.

---

## Página de inicio

La página de inicio de la aplicación es `src/index.html`, que redirige automáticamente a `src/pages/html/home.html`.

---

## Listado de páginas HTML

| Página | Archivo |
|--------|---------|
| Home | `src/pages/html/home.html` |
| Login | `src/pages/html/login.html` |
| Registro | `src/pages/html/register.html` |
| Búsqueda sin usuario | `src/pages/html/search-no-user.html` |
| Vista de outfit sin usuario | `src/pages/html/outfit-no-user.html` |
| Búsqueda con usuario | `src/pages/html/search-with-user.html` |
| Vista de outfit con usuario | `src/pages/html/outfit-with-user.html` |
| Perfil | `src/pages/html/profile.html` |
| Editar perfil | `src/pages/html/update.html` |
| Subir outfit | `src/pages/html/upload.html` |

---

## Diseño Responsive

Los archivos CSS con implementación responsive son:

- **`src/style.css`** — Sistema de diseño global con variables CSS, tipografía escalable y paletas de color.
- **`src/pages/css/no-user.css`** — Layout de páginas sin usuario. El texto principal usa `clamp()` para escalar entre tamaños de pantalla.
- **`src/pages/css/with-user.css`** — Layout de páginas con usuario. En móvil (`max-width: 1023px`), elimina el margen de la sidebar y añade padding inferior para la barra de navegación inferior.
- **`src/pages/css/home.css`** — Ajuste de tamaño de fuente del titular en pantallas pequeñas.
- **`src/pages/css/login.css`** y **`src/pages/css/register.css`** — En móvil, el formulario se alinea arriba en lugar de centrado verticalmente.
- **`src/templates/css/side-bar.css`** — En escritorio, la sidebar es vertical a la izquierda. En móvil (`max-width: 1023px`), se convierte en una barra de navegación inferior horizontal fija. Se ocultan el logo y las notificaciones en móvil.
- **`src/templates/css/search-results.css`** — La cuadrícula de resultados pasa de 4 columnas en escritorio a 2 columnas en tablet/móvil.
- **`src/templates/css/login-form.css`** y **`src/templates/css/register-form.css`** — Ajustan padding, tamaños de fuente y espaciado de campos en pantallas pequeñas.
- **`src/templates/css/edit-profile-form.css`** — En móvil, los botones del pie de formulario se apilan en columna y ocupan el ancho completo.
- **`src/templates/css/outfit-view.css`** — En móvil (`max-width: 767px`), la tarjeta de outfit pasa de layout horizontal a vertical.
- **`src/templates/css/top-bar.css`** — Usa `container queries`; en contenedores pequeños, la barra se centra.

---

## Validaciones HTML en formularios

### Formulario de Login — `src/templates/html/login-form.html` / `src/templates/js/login-form.ts`

| Campo | Validación |
|-------|------------|
| Nombre de usuario | `required`, `type="text"` |
| Contraseña | `required`, `type="password"` |
| Autenticación | Validación JS: comprueba usuario y contraseña contra `src/resources/users.json`. Si no coinciden, muestra `alert("Invalid username or password")` |

### Formulario de Registro — `src/templates/html/register-form.html`

| Campo | Validación |
|-------|------------|
| Nombre de usuario | `required`, `type="text"` |
| Contraseña | `required`, `type="password"` |
| Repetir contraseña | `required`, `type="password"` |

### Formulario de Edición de Perfil — `src/templates/html/edit-profile-form.html`

| Campo | Validación |
|-------|------------|
| Nombre | `required`, `type="text"` |
| Contraseña | `required`, `type="password"` |
| Descripción | `required`, `type="text"` |

### Formulario de Subida de Outfit — `src/templates/html/outfit-upload-form.html`

| Campo | Validación |
|-------|------------|
| Nombre del outfit | `required`, `type="text"` |
| Descripción | `required`, `type="text"` |

### Usuario y contraseña de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Administrador | `admin` | `admin` |
| Usuario registrado | `user1` | `1234` |
| Usuario registrado | `user2` | `1234` |

---

## Carga de Templates y Contenido JSON

### Mecanismo general

El sistema de carga de templates y datos está implementado en **`src/common.js`**:

- **Carga de templates**: `loadStructure()` recorre los elementos `<div>` del DOM buscando clases con el prefijo `template-`. Por cada una, realiza un `fetch` al archivo HTML correspondiente en `src/templates/html/` y lo inserta en el DOM de forma recursiva.

  **Ejemplo**: En `src/pages/html/login.html`, el `<div id="main" class="template-login-form">` hace que se cargue `src/templates/html/login-form.html` mediante fetch.

- **Carga de datos JSON**: `loadDynamicContentFor(url, callback)` realiza un `fetch` a una URL JSON y llama a una función de carga con los datos recibidos.

  **Ejemplo**: En `src/pages/js/login.ts`, se llama a `loadDynamicContentFor("/src/templates/json/login-form.json", loadLoginForm)`, que rellena los textos del formulario con los datos del JSON.

### Páginas y sus cargas

| Página | Archivo JS | Templates cargados | JSONs cargados |
|--------|------------|-------------------|----------------|
| `home.html` | `src/pages/js/home.ts` | `top-bar`, `search-results`, `bottom-bar` | `top-bar.json`, `home.json`, `outfits.json`, `bottom-bar.json` |
| `login.html` | `src/pages/js/login.ts` | `top-bar`, `login-form`, `bottom-bar` | `top-bar.json`, `login-form.json`, `bottom-bar.json` |
| `register.html` | `src/pages/js/register.ts` | `top-bar`, `register-form`, `bottom-bar` | `top-bar.json`, `register-form.json`, `bottom-bar.json` |
| `search-no-user.html` | `src/pages/js/search-no-user.js` | `top-bar`, `search-bar`, `search-results`, `bottom-bar` | `top-bar.json`, `search-bar.json`, `outfits.json`, `bottom-bar.json` |
| `search-with-user.html` | `src/pages/js/search-with-user.js` | `side-bar`, `search-bar`, `profile-photo`, `search-results`, `bottom-bar` | `side-bar.json`, `search-bar.json`, `profile-photo.json`, `outfits.json`, `bottom-bar.json` |
| `outfit-no-user.html` | `src/pages/js/outfit.ts` | `top-bar`, `search-bar`, `outfit-view`, `bottom-bar` | `top-bar.json`, `search-bar.json`, `outfits.json`, `bottom-bar.json` |
| `outfit-with-user.html` | `src/pages/js/outfit-view-with-user.js` | `side-bar`, `search-bar`, `profile-photo`, `outfit-view`, `bottom-bar` | `side-bar.json`, `search-bar.json`, `profile-photo.json`, `outfits.json`, `bottom-bar.json` |
| `profile.html` | `src/pages/js/profile.js` | `side-bar`, `profile-photo`, `search-results`, `bottom-bar` | `side-bar.json`, `profile.json`, `outfits.json`, `profile-photo.json`, `bottom-bar.json` |
| `update.html` | `src/pages/js/update.ts` | `side-bar`, `edit-profile-form`, `bottom-bar` | `side-bar.json`, `edit-profile-form.json`, `bottom-bar.json` |
| `upload.html` | `src/pages/js/upload.js` | `side-bar`, `outfit-upload-form`, `bottom-bar` | `side-bar.json`, `outfit-upload-form.json`, `bottom-bar.json` |

---

## Ubicación del contenido JSON

El contenido JSON es **local** (no se usa Json-server ni Strapi):

- **Datos de outfits**: `src/resources/outfits.json`
- **Datos de usuarios**: `src/resources/users.json`
- **Textos de templates**: `src/templates/json/` (un archivo por template)
- **Textos de páginas**: `src/pages/json/` (un archivo por página que lo necesite)

---

