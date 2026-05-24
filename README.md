# Outfitera
### El objetivo de esta web es proporcionar una red social dedicada a outfits, donde los usuarios puedan ver, guardar y compartir sus outfits favoritos para cualquier estilo y ocasión.
### Los usuarios pueden explorar combinaciones de ropa creadas por la comunidad, inspirarse con nuevas tendencias y organizar sus looks favoritos en un solo lugar.

### Componentes del grupo:
- Helen González Báez
- Roberto Rodríguez Guillén
- Sergio Rodríguez Rubio

---

# IMPORTANTE
### El proyecto usa Angular 20, Ionic 8 y Capacitor 8. Para ejecutarlo en web se usa `npm start` (o `ng serve`). Para compilarlo como app nativa Android: `ng build && npx cap sync android` y abrir el proyecto `android/` en Android Studio.

---

## Descripción del Sprint 3

El objetivo de este Sprint es portar la aplicación web Angular a una aplicación híbrida con *Ionic 8* y *Capacitor 8*, de forma que pueda ejecutarse tanto en navegador como compilada nativamente para Android (e iOS), e incorporar un nuevo servicio de favoritos con persistencia local. A continuación se describen los requisitos implementados:

1. *Migración a componentes Ionic*: Se han sustituido los elementos HTML nativos y componentes personalizados por sus equivalentes de Ionic — `IonButton`, `IonInput`, `IonTextarea`, `IonList`, `IonItem`, `IonChip`, `IonIcon`, `IonFab`. Toda la aplicación se ha encapsulado dentro de `IonApp` + `IonRouterOutlet`, y cada página se ha convertido en una `ion-page` con su propio `IonContent` (a través del componente reutilizable `PageShell`). Se ha configurado `IonicRouteStrategy` como `RouteReuseStrategy` para integrar la navegación con el ciclo de vida de Ionic.

2. *Empaquetado nativo con Capacitor*: Se ha integrado Capacitor 8 para empaquetar la aplicación como app nativa Android:
    - Sincronización de los assets web al proyecto Android mediante `npx cap sync android`.
    - Manejo del botón de retroceso hardware en Android usando `Platform.backButton` y `@capacitor/app`: si hay historial de navegación se vuelve atrás dentro del router; si no, se cierra la app.

3. *Servicio de Favoritos (FavoritesService)*: Se ha implementado un sistema de favoritos persistente que funciona tanto en nativo como en web, usando `@capacitor-community/sqlite`:
    - En Android/iOS, persiste en una base de datos SQLite local del dispositivo.
    - En web, persiste en IndexedDB mediante el mismo plugin (fallback automático).
    - Los favoritos están aislados por usuario gracias a una tabla con clave compuesta `(userId, outfitId)`, de forma que distintas cuentas en el mismo dispositivo no comparten favoritos.
    - Se ha añadido la página `/favorites` y un botón en cada outfit (`IonFab` con icono corazón) para añadir o quitar el outfit de favoritos.

4. *Diseño Responsive con shell nativa*: Se ha mantenido el sistema de variables CSS y los breakpoints del sprint anterior, pero adaptando el shell a la estructura `IonApp` + `IonRouterOutlet`. La `SideBar` sigue siendo barra lateral en escritorio y barra inferior de navegación en móvil/tablet.

---

## Estructura de componentes creados y su funcionalidad

### Páginas

| Componente | Ruta       | Descripción                                                                                  |
|------------|------------|----------------------------------------------------------------------------------------------|
| Home       | /home      | Página de inicio. Muestra outfits destacados cargados desde Firebase.                        |
| Login      | /login     | Formulario de autenticación contra Firebase Authentication.                                  |
| Register   | /register  | Formulario de registro. Crea el usuario en Firebase Auth.                                    |
| Search     | /search    | Búsqueda de outfits por nombre, descripción, tags o usuarios.                                |
| Outfit     | /outfit    | Vista de detalles y comentarios de un outfit, con botón para añadir/quitar de favoritos.     |
| Profile    | /profile   | Perfil del usuario: foto, datos y grid de sus outfits.                                       |
| Update     | /update    | Formulario de edición de perfil con validaciones Angular.                                    |
| Upload     | /upload    | Formulario de subida y actualización de outfit con imagen a Firestore.                       |
| Favorites  | /favorites | Listado de outfits marcados como favoritos por el usuario actual (persistencia local).       |

---

### Componentes reutilizables

| Componente      | Descripción                                                                                           |
|-----------------|-------------------------------------------------------------------------------------------------------|
| TopBar          | Barra superior de navegación para páginas sin usuario. Carga textos desde Firebase.                   |
| SideBar         | Barra lateral (escritorio) / barra inferior (móvil) para páginas con usuario. Muestra notificaciones. |
| SearchBar       | Campo de búsqueda dinámica. Filtra resultados en tiempo real contra Firebase.                         |
| SearchResults   | Grid de tarjetas de outfits.                                                                          |
| OutfitView      | Tarjeta de detalle de un outfit con imagen, título, descripción y acciones.                           |
| ProfilePhoto    | Foto de perfil de un usuario que redirige al perfil de dicho usuario en click.                        |
| FloatingProfile | Foto de perfil del usuario logeado.                                                                   |

---

### Servicios

| Servicio            | Descripción                                                                                                                                                                |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AuthService         | Gestiona el registro, login y logout de usuarios contra Firebase Authentication. Expone el usuario actualmente autenticado como Observable.                                |
| CrudService         | Interfaz de CRUD genérica que permita la reimplementacion.                                                                                                                 |
| OutfitService       | CRUD de outfits.                                                                                                                                                           |
| UserService         | CRUD de usuarios con IDs basados en el servicio de autenticación.                                                                                                          |
| CommentService      | CRUD de comentarios en outfits.                                                                                                                                            |
| NotificationService | CRUD de notificaciones por comentarios nuevos en outfits.                                                                                                                  |
| FavoritesService    | Gestión de outfits favoritos del usuario actual con persistencia local vía `@capacitor-community/sqlite` (SQLite en nativo, IndexedDB en web). Aislamiento por `userId`.   |

---

### Guards

| Guard            | Descripción                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------|
| AuthGuard        | Protege las rutas que requieren usuario autenticado. Redirige a /login si no hay sesión activa. |
| GuestGuard       | Bloquea rutas como /login o /registers a usuarios ya logeados.                                  |
| OutfitEditGuard  | Protege la edición de outfits a propietarios y administradores.                                 |
| ProfileEditGuard | Protege la edición de perfiles a propietarios y administradores.                                |

---

## Estructura de datos en Firebase

### Firebase Authentication

Cada usuario registrado tiene una entrada en Firebase Authentication con los siguientes campos gestionados automáticamente:

| Campo     | Tipo          | Descripción                                                                |
|-----------|---------------|----------------------------------------------------------------------------|
| uid       | string        | Identificador único del usuario generado por Firebase.                     |
| email     | string        | Correo electrónico del usuario (usado como identificador de login).        |
| password  | string (hash) | Contraseña almacenada de forma segura por Firebase (nunca en texto plano). |
| createdAt | timestamp     | Fecha y hora de creación de la cuenta.                                     |

---

### Firestore

La base de datos en tiempo real sigue la siguiente estructura de nodos JSON:

#### /users

Almacena los datos extendidos del perfil de cada usuario, indexados por su uid de Firebase Authentication.

| Campo           | Tipo   | Descripción                                |
|-----------------|--------|--------------------------------------------|
| name            | string | Nombre de usuario dentro de la plataforma. |
| email           | string | Correo electrónico del usuario.            |
| description     | string | Descripción del usuario.                   |
| profilePhotoSrc | string | URL de la foto de perfil.                  |
| role            | string | Rol del usuario: admin o user.             |

---

#### /outfits

Almacena todos los outfits publicados en la plataforma.

| Campo       | Tipo     | Descripción                                                    |
|-------------|----------|----------------------------------------------------------------|
| title       | string   | Título del outfit.                                             |
| description | string   | Descripción del outfit.                                        |
| src         | string   | URL pública de la imagen del outfit.                           |
| userId      | string   | UID del usuario que ha subido el outfit.                       |
| tags        | string[] | Etiquetas / categorías del outfit (ej: casual, formal, sport). |

---

#### /notifications

Almacena las notificaciones no leídas generadas tras añadir comentarios a outfits.

| Campo    | Tipo     | Descripción                                                               |
|----------|----------|---------------------------------------------------------------------------|
| message  | string   | Título del outfit.                                                        |
| outfitId | string   | Id del outfit donde se escribió el comentario.                            |
| userId   | string   | Id del usuario propietario del outfit, usado para agilizar los filtrados. |

---

#### /comments

Almacena los comentarios creados en outfits.

| Campo    | Tipo     | Descripción                                    |
|----------|----------|------------------------------------------------|
| comment  | string   | Título del outfit.                             |
| outfitId | string   | Id del outfit donde se escribió el comentario. |
| userId   | string   | Id del usuario que escribió el comentario.     |

### Formulario de Login — /login

| Campo         | Validación                                                                              |
|---------------|-----------------------------------------------------------------------------------------|
| Email         | required, email                                                                         |
| Contraseña    | required, minLength                                                                     |
| Autenticación | Firebase Auth: si las credenciales no coinciden, se muestra un mensaje de error inline. |

### Formulario de Registro — /register

| Campo              | Validación                                  |
|--------------------|---------------------------------------------|
| Nombre de usuario  | required, minLength                         |
| Email              | required, email                             |
| Contraseña         | required, minLength                         |
| Repetir contraseña | required, validador personalizado mustMatch |

### Formulario de Edición de Perfil — /update

| Campo                    | Validación          |
|--------------------------|---------------------|
| URL de la foto de Perfil | ninguna             |
| Nombre de usuario        | required, minLength |
| Descripción              | ninguna             |

### Formulario de Subida/Actualización de Outfit — /upload

| Campo          | Validación |
|----------------|------------|
| URL del outfit | required   |
| Título         | required   |
| Descripción    | ninguna    |
| Tags           | ninguna    |

---

## Usuarios de prueba

| Rol     | Email          | Contraseña |
|---------|----------------|------------|
| usuario | test@user.com  | 123456     |
| admin   | test@admin.com | 123456     |

---

## Diseño Responsive

El diseño responsive está implementado con un sistema de variables CSS personalizadas (definidas en :root) que centraliza la paleta de color, tipografía, espaciados y radios, complementadas con los tokens CSS de Ionic en `src/theme/variables.css`. Más allá de los componentes de Ionic, no se utiliza ningún framework externo de estilos.

| Breakpoint   | Ancho    | Comportamiento principal                              |
|--------------|----------|-------------------------------------------------------|
| Móvil/Tablet | < 768px  | Sidebar se convierte en barra de navegación inferior. |
| Escritorio   | ≥ 1024px | Sidebar vertical a la izquierda.                      |

Los archivos CSS con implementación responsive son por ejemplo:

- *src/style.css* — Sistema de diseño global con variables CSS, tipografía escalable y paletas de color.
- *src/app/shared/components/side-bar/side-bar.css* — En escritorio, la sidebar es vertical a la izquierda. En móvil (max-width: 1023px), se convierte en una barra de navegación inferior horizontal fija.
- *src/app/shared/components/search-results/search-results.css* — La cuadrícula de resultados pasa de 4 columnas en escritorio a 2 columnas en tablet/móvil.
