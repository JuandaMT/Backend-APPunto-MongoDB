
![banner](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/b24f1ec2-04d8-43ec-b28a-589e20a956ec)


# Proyecto de Backend: App de Bonificación para Alumnos :white_check_mark:

Este proyecto de backend tiene como objetivo desarrollar una API REST utilizando las tecnologías:

![icons8-mongodb-48](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/76a10dc6-c2dc-4fcb-8ab0-9064ecdd8a14)
![icons8-nodejs-50](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/bb088984-7967-45a7-8189-6237347b531e)
![icons8-express-js-50 (3)](https://github.com/JuandaMT/Proyecto-Backend-App-Puntos/assets/130000511/527f342c-4798-43ac-9114-352535c69028)


## Objetivos del proyecto
Appunto es una API REST educativa, con un backend desarrollado en JavaScript, utilizando Express, Mongosh y Mongoose para una integración sólida con una base de datos MongoDB. Bcrypt y JSON Web Token para garantizar la seguridad de los datos de los usuarios. Además, utiliza Nodemailer para confirmar correos electrónicos y mejorar la seguridad.

El concepto del proyecto es el de desarrollar una herramienta de gestión de puntos para los alumnos de una clase. Los puntos serán otorgados por el profesorado en función del rendimiento del alumnado. La acumulación de puntos representa el desarrollo del alumno y permite llevar una gestión de los alumnos en función de su rendimiento académico. Con la obtención de puntos, los alumnos se van posicionando entre la clase para obtener una serie de ventajas.

## Colecciones

### Colección "Usuarios" 👤

Esta colección almacenará la información de todos los usuarios, incluyendo alumnos y profesores. Cada usuario tendrá los siguientes campos:
ID: Identificador único del usuario.

Nombre: Nombre del usuario. <br>
Email: Email del usuario.<br>
Contraseña: Contraseña del usuario.<br>
Edad: Edad del usuario.<br>
Rol: Rol del usuario (alumno o profesor).<br>
Puntos: Puntos acumulados por el usuario.<br>

### Colección "Respuestas" 📥

Esta colección registrará las diferentes respuestas. Cada grupo tendrá los siguientes campos:
ID: Identificador único del grupo.<br>
ID Alumno: ID del alumno que escribe la respuesta.<br>
Respuesta: Respuesta de la pregunta.

### Colección "Dudas" ❓

Esta colección registrará las dudas planteadas por los alumnos. Cada duda tendrá los siguientes campos:
ID: Identificador único de la duda.<br>
ID Preguntas: Identificador único de las preguntas.<br>
ID Respuestas: Identificador único de las respuestas.<br>
Usuario_ID: Identificador del alumno que generó la duda.<br>
Tema: Tema de la pregunta.<br>
Pregunta: Pregunta planteada por el alumno.<br>
Resuelta: Indicador booleano que muestra si la duda ha sido resuelta o no.

## Documentación

[Documentación de Postman - API](https://documenter.getpostman.com/view/28245188/2s946maA1f) 


## Despliegue 🚀


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
