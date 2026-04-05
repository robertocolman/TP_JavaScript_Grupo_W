# TP 1 - Programación III (2026)

## Facultad de Ciencias de la Administración - UNER
**TECNICATURA UNIVERSITARIA EN DESARROLLO WEB**

---

### Descripción del Proyecto
Este Trabajo Práctico consiste en el desarrollo de un módulo de **Node.js** que interactúa con la API de Game of Thrones (**ThronesAPI**) para recuperar, persistir y manipular información de personajes utilizando el módulo **File System** y métodos avanzados de arrays.

### Integrantes - Grupo "W"
* Colman, Roberto
* Valenzuela, Nahuel
* Plaza, Leandro
* [Apellido, Nombre]
* [Apellido, Nombre]
* [Apellido, Nombre]

---

### Requisitos y Tecnologías
* **Node.js**: Versión 18 o superior recomendada.
* **Sintaxis**: Uso de **Async/Await** y manejo de excepciones con bloques **try...catch**.
* **Módulos**: Utilización de **File System (fs)** de NodeJS.

### Funcionalidades Implementadas

#### 1. API Fetch - File System
* **GET**: Recuperación de la información de todos los personajes.
* **POST**: Simulación de agregado de un nuevo personaje.
* **GET (ID)**: Búsqueda de un personaje determinado utilizando su "id" como parámetro.
* **Persistencia**: Los datos de la consulta inicial se persisten en un archivo local en formato **JSON**.

#### 2. Métodos de Arrays y File System
* **Modificación**: Agregado de un personaje al final del archivo y dos personajes al inicio.
* **Eliminación**: Eliminación del primer personaje, mostrando por consola el elemento eliminado.
* **Transformación**: Creación de un nuevo archivo que contiene únicamente los campos `id` y nombres de los personajes.
* **Ordenamiento**: Implementación del método **sort()** para ordenar por nombre de forma decreciente.

---

### 📦 Instrucciones de Ejecución
1. Extraer el archivo comprimido (.zip, .rar, .tar.gz) o clonar el repositorio de GitHub.
2. Asegurarse de tener **Node.js** instalado.
3. Abrir una terminal en la ruta del proyecto.
4. Ejecutar la aplicación con el comando:
   ```bash
   node app.js