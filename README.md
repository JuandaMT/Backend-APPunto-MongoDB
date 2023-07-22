
![banner](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/b24f1ec2-04d8-43ec-b28a-589e20a956ec)


# Proyecto de Backend: App de Bonificación para Alumnos

Este proyecto de backend tiene como objetivo desarrollar una API REST utilizando las tecnologías:
* Node.js
* Express.js
* MongoDB/Mongoose. 

## Objetivos del proyecto
La aplicación consiste en una app de bonificación para alumnos, donde se registrarán usuarios, se podrán plantear dudas, responder preguntas y asignar puntos a los usuarios, para así ofrecer a los usuarios una serie de ventajas en función de sus puntuaciones.

## Colecciones

### Colección "Usuarios"
Esta colección almacenará la información de todos los usuarios, incluyendo alumnos y profesores. Cada usuario tendrá los siguientes campos:
ID: Identificador único del usuario.
Nombre: Nombre del usuario.
Email: Email del usuario.
Contraseña: Contraseña del usuario.
Edad: Edad del usuario.
Rol: Rol del usuario (alumno o profesor).
Puntos: Puntos acumulados por el usuario.
... (Otros detalles relevantes)

### Colección "Respuestas"
Esta colección registrará las diferentes respuestas. Cada grupo tendrá los siguientes campos:
ID: Identificador único del grupo.
ID Alumno: ID del alumno que escribe la respuesta.
Respuesta: Respuesta de la pregunta.

### Colección "Dudas"
Esta colección registrará las dudas planteadas por los alumnos. Cada duda tendrá los siguientes campos:
ID: Identificador único de la duda.
ID Preguntas: Identificador único de las preguntas.
ID Respuestas: Identificador único de las respuestas.
Usuario_ID: Identificador del alumno que generó la duda.
Tema: Tema de la pregunta.
Pregunta: Pregunta planteada por el alumno.
Resuelta: Indicador booleano que muestra si la duda ha sido resuelta o no.

## Despliegue

Para desplegar el proyecto:

```bash
  npm run deploy
```
## Puntos por desarrollar
* Establecer una conexión con el backend
* Terminar el resto de páginas
* Implementar una SPA
## Autores

- [@patrigarcia ]([https://github.com/JuandaMT/Proyecto-Backend](https://github.com/patrigarcia))
- [@JuandaMT]([https://github.com/JuandaMT/Proyecto-Backend](https://github.com/JuandaMT)https://github.com/JuandaMT)
