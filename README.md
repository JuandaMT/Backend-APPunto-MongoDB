
![banner](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/b24f1ec2-04d8-43ec-b28a-589e20a956ec)


# Proyecto de Backend: App de Bonificación para Alumnos :white_check_mark:

Este proyecto de backend tiene como objetivo desarrollar una API REST utilizando las tecnologías:

* ![nodejs](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/b877430d-f9e0-4d8e-9e87-b310330380d2)
* ![MongoDB_Logo svg](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/21b20dc6-8af4-40ff-a358-390db5802c6a)
* ![Expressjs](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/ce31d3c2-2721-489f-bb74-8e397fbe786b)



## Objetivos del proyecto
Appunto es una API REST educativa, con un backend desarrollado en JavaScript, utilizando Express, Mongosh y Mongoose para una integración sólida con una base de datos MongoDB. Bcrypt y JSON Web Token para garantizar la seguridad de los datos de los usuarios. Además, utiliza Nodemailer para confirmar correos electrónicos y mejorar la seguridad.

## Colecciones

### Colección "Usuarios" ![usuario](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/1fdfae04-93b2-4343-849a-3b394f113c74)

Esta colección almacenará la información de todos los usuarios, incluyendo alumnos y profesores. Cada usuario tendrá los siguientes campos:
ID: Identificador único del usuario.
Nombre: Nombre del usuario.
Email: Email del usuario.
Contraseña: Contraseña del usuario.
Edad: Edad del usuario.
Rol: Rol del usuario (alumno o profesor).
Puntos: Puntos acumulados por el usuario.
... (Otros detalles relevantes)

### Colección "Respuestas" ![respuesta](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/6240ac40-9498-456c-93f7-a0ad639fe098)

Esta colección registrará las diferentes respuestas. Cada grupo tendrá los siguientes campos:
ID: Identificador único del grupo.
ID Alumno: ID del alumno que escribe la respuesta.
Respuesta: Respuesta de la pregunta.

### Colección "Dudas" ![pregunta](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/407c4394-d2bf-40b3-b82a-e774347ee08f)

Esta colección registrará las dudas planteadas por los alumnos. Cada duda tendrá los siguientes campos:
ID: Identificador único de la duda.
ID Preguntas: Identificador único de las preguntas.
ID Respuestas: Identificador único de las respuestas.
Usuario_ID: Identificador del alumno que generó la duda.
Tema: Tema de la pregunta.
Pregunta: Pregunta planteada por el alumno.
Resuelta: Indicador booleano que muestra si la duda ha sido resuelta o no.

## Despliegue ![cohete](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/5e79c38f-cb28-4e55-aae1-c822c77de6fa)


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
