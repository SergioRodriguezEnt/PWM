# Outfitera
### El objetivo de esta web es proporcionar una red social dedicada a outfits, donde los usuarios puedan ver, guardar y compartir sus outfits favoritos para cualquier estilo y ocasión.
### Los usuarios pueden explorar combinaciones de ropa creadas por la comunidad, inspirarse con nuevas tendencias y organizar sus looks favoritos en un solo lugar.

### Componentes del grupo:
- Helen González Báez
- Roberto Rodríguez Guillén
- Sergio Rodríguez Rubio

---

# IMPORTANTE
### El proyecto usa angular 20. Se debe ejecutar mediante el comando "ng serve".

---

## Descripción del Sprint 3

El objetivo de este Sprint es adaptar el sitio web a *Angular* como framework de desarrollo web e integrar *Firebase* como backend. A continuación se describen los requisitos implementados:

1. *Formularios con Angular*: Se han implementado formularios usando las facilidades de Angular (Reactive Forms / Template-driven Forms) con validaciones integradas. El caso obligatorio implementado es el de registro y autenticación de usuarios, que permite mostrar contenido diferenciado según si el usuario está autenticado y según su rol (administrador / usuario registrado).

2. *Diseño Responsive (RWD): Para conseguir que los diseños sean adaptables a distintos dispositivos se ha utilizado **Flexbox* y *CSS Grid* nativos, junto con un sistema de variables CSS personalizadas que define la paleta de color, tipografía, espaciados y radios de manera global.

3. *Integración con Firebase*:
- *Firebase Authentication*: gestión de registro y login de usuarios.
- *Firestore*: almacenamiento y sincronización en tiempo real del contenido dinámico.

---

## Estructura de componentes creados y su funcionalidad

### Páginas

| Componente | Ruta      | Descripción                                                            |
|------------|-----------|------------------------------------------------------------------------|
| Home       | /home     | Página de inicio. Muestra outfits destacados cargados desde Firebase.  |
| Login      | /login    | Formulario de autenticación contra Firebase Authentication.            |
| Register   | /register | Formulario de registro. Crea el usuario en Firebase Auth.              |
| Search     | /search   | Búsqueda de outfits por nombre, descripción, tags o usuarios.          |
| Outfit     | /outfit   | Vista de detalles y comentarios de un outfit.                          |
| Profile    | /profile  | Perfil del usuario: foto, datos y grid de sus outfits.                 |
| Update     | /update   | Formulario de edición de perfil con validaciones Angular.              |
| Upload     | /upload   | Formulario de subida y actualización de outfit con imagen a Firestore. |

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

| Servicio            | Descripción                                                                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| AuthService         | Gestiona el registro, login y logout de usuarios contra Firebase Authentication. Expone el usuario actualmente autenticado como Observable. |
| CrudService         | Interfaz de CRUD genérica que permita la reimplementacion.                                                                                  |
| OutfitService       | CRUD de outfits.                                                                                                                            |
| UserService         | CRUD de usuarios con IDs basados en el servicio de autenticación.                                                                           |
| CommentService      | CRUD de comentarios en outfits.                                                                                                             |
| NotificationService | CRUD de notificaciones por comentarios nuevos en outfits.                                                                                   |

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

El diseño responsive está implementado con un sistema de variables CSS personalizadas (definidas en :root) que centraliza la paleta de color, tipografía, espaciados y radios. No se utiliza ningún framework externo de estilos.

| Breakpoint   | Ancho    | Comportamiento principal                              |
|--------------|----------|-------------------------------------------------------|
| Móvil/Tablet | < 768px  | Sidebar se convierte en barra de navegación inferior. |
| Escritorio   | ≥ 1024px | Sidebar vertical a la izquierda.                      |

Los archivos CSS con implementación responsive son por ejemplo:

- *src/style.css* — Sistema de diseño global con variables CSS, tipografía escalable y paletas de color.
- *src/app/shared/components/side-bar/side-bar.css* — En escritorio, la sidebar es vertical a la izquierda. En móvil (max-width: 1023px), se convierte en una barra de navegación inferior horizontal fija.
- *src/app/shared/components/search-results/search-results.css* — La cuadrícula de resultados pasa de 4 columnas en escritorio a 2 columnas en tablet/móvil.
