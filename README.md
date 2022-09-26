# Desafío Clase 22: Mocks y Normalización
#### Curso: Backend Coderhouse

Para incializar y probar los programas de debe ejecutar ```npm install```
y luego ejecutar ```nodemon server.js``` dentro de la carpeta correspondiente al 
motor de plantillas handlebars.

- El endpoint está en puerto 8080.
- Formulario de creacion de productos en la ruta "/"
- Se utilizo faker para generar mocks de productos
- El catalogo de productos se puede visualizar en la ruta "/api/productos-test"
- Se utilizo Normalizr para realizar compresion de los mensajes con formato {author:{id, nombre,    apellido, edad, alias, avatar}, text}. Al Normalizar los mensajes almacenados pasan de 1982 bytes a 426 bytes, se logro una compresión del 79%

#### Carola Cimini