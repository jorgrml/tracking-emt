# Prueba de conepto de angular-redux

Esta demo monitoriza el recorrido de los autobuses de la [EMT de Málaga](http://www.emtmalaga.es/) a través del servicio publico de sus posiciones.

### Installation

Se requiere [Node.js](https://nodejs.org/) v4+.

Instalar las dependencias y arrancar el servidor

```sh
$ cd tracking-emt
$ npm i
$ npm run start
```
Se publica por defecto en : http://localhost:3000.

Para incluir la key de google maps hay que editar el archivo /src/index.html e incluir en el script

```sh
<script src="http://maps.googleapis.com/maps/api/js?key=YOUR_KEY></script>
```
### Ejecucion

Es necesario ejecutarla en un navegador sin CROSS habilitado.

La aplicación va refrescando la posicion de los buses de la linea 25 montando el tracking.

![](/src/assets/readme/1.png?raw=true "Track")


Este recorrido se puede reproducir habiliantando la extensión de chrome para [ngRedux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) 

![](/src/assets/readme/2.jpg?raw=true "Dev")