# Challenge Técnico Telecom - Eduardo Sanchez Lopez

## Instrucciones para levantar el servicio
 - copiar [este](https://drive.google.com/file/d/1moCLBJYckCmh8wJPvRKU_6uIZIvBFdCZ/view?usp=sharing) archivo .env en la ruta raiz del proyecto
 - ```yarn install``` o ```npm install``` para instalar las dependecias del proyecto
 - ```yarn install``` o ```npm run start``` para iniciar el proyecto

## Instrucciones para levantar el servicio usando docker-compose
- copiar [este](https://drive.google.com/file/d/1moCLBJYckCmh8wJPvRKU_6uIZIvBFdCZ/view?usp=sharing) archivo .env en la ruta raiz del proyecto
 - ```docker-compose up --build -d``` para levantar los servicios definidos en **docker-compose.yml**
 - ```docker-compose down``` para detener todos los servicios relacionados al proyecto
> Nota: si se utiliza `docker` la ubicacion por ip del request no puede ser obtenida en el entorno local, tiene un valor mock.

### Otros comandos utiles
- ```yarn lint``` o ```npm run lint``` para correr el analsis estatico del codigo
- ```yarn test``` o ```npm run test``` para correr los test que se encuentran en **./test**
- ```yarn release``` o ```npm run release``` para lanzar una nueva version en el changelog
- ```yarn dev``` o ```npm run dev``` para iniciar el servicio en modo desarrollo

## Documentacion de los endpoints:
 - [Postman](https://documenter.getpostman.com/view/17908890/2s83f8isGn)
