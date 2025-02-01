# MercadoChallenge

¡Bienvenido/a! Este proyecto consiste en la implementación de  una aplicacion con **Server Side Rendering (SSR)** para una aplicación React. Se utiliza Express para el servidor, Webpack para empaquetar el código (tanto del cliente como del servidor) y React Router para la navegación. Además, se emplea Sass para los estilos y se integran librerías como ReactToastify para notificaciones. Permite buscar productos y mostrar su detalle, consumiendo la [API pública de MercadoLibre](https://developers.mercadolibre.com/). Incluye:




- **Frontend**: React + Sass  
- **Backend**: Node.js (Express)

Adicional realiza 

## Índice

1. [Descripción](#descripción)  
2. [Tecnologías y dependencias principales](#tecnologías-y-dependencias-principales)  
3. [Estructura del proyecto](#estructura-del-proyecto)  
4. [Flujo de Server Side Rendering](#flujo-de-server-side-rendering)
5. [Variables de entorno](#variables-de-entorno)  
6. [Instalación y ejecución](#instalación-y-ejecución)  
7. [Scripts de npm](#scripts-de-npm)  
8. [Testing](#testing)  
9. [Notas y mejoras futuras](#notas-y-mejoras-futuras)  
10. [Autor](#autor)  

---

## Descripción

Este proyecto cumple con los siguientes **requerimientos**:

- **Caja de búsqueda** en la página principal (`/`) para ingresar un término y redirigir a los resultados (`/items?search=...`).
- **Listado de resultados** mostrando los primeros 4 productos relevantes.
- **Detalle de producto** mostrando la información completa (precio, envío, descripción, etc.).
- **Breadcrumb**:
  - En la **vista de resultados**, se arma con la categoría que más resultados obtuvo (según la API de búsqueda).
  - En la **vista de detalle**, se arma con la categoría propia del ítem (si está disponible).
- **Endpoints** en el backend:
  - `GET /api/items?q=:query` (consume `https://api.mercadolibre.com/sites/MLA/search?...`)
  - `GET /api/items/:id` (consume `https://api.mercadolibre.com/items/:id` y `https://api.mercadolibre.com/items/:id/description`)



---

## Tecnologías y dependencias principales

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Sass](https://sass-lang.com/)  
  - [React Router Dom 6](https://reactrouter.com/en/main)
- **Backend**:
  - [Node.js >= 20](https://nodejs.org/en)
  - [Express](https://expressjs.com/)
  - [Axios](https://axios-http.com/)
- **Testing**:
  - [Jest](https://jestjs.io/)  
- **Herramientas de desarrollo**:
  - [Concurrently](https://www.npmjs.com/package/concurrently) (ejecutar cliente y servidor en paralelo)

---

## Estructura del proyecto

La estructura sugerida es la siguiente (simplificada):


1. **Raíz**: Contiene un `package.json` que orquesta scripts para levantar ambos entornos (client y server).  
2. **`client/`**: Aplicación React (con Sass) y sus dependencias.  
3. **`server/`**: Servidor Express + Node, archivos de rutas, controladores, servicios y tests de backend.

---

## Flujo de Server Side Rendering

1. **Recepción de la Solicitud:**
   - El navegador realiza una solicitud HTTP (por ejemplo, a `http://localhost:3200`).

2. **Renderizado en el Servidor:**
   - Express (configurado en `server/server.js`) recibe la solicitud y utiliza el router definido en `server/routes/index.js` para dirigirla al controlador correspondiente.
   - El controlador (por ejemplo, `server/controllers/mainController.js`) invoca la función `renderApp`, que:
     - Envuelve el componente `<App />` en un `<StaticRouter>` (de `react-router-dom/server`) para manejar las rutas basadas en la URL de la petición.
     - Utiliza `ReactDOMServer.renderToString` para transformar el componente en una cadena HTML.
     - Inserta este HTML en una plantilla completa que incluye el `<head>` (con metadatos, favicon, enlaces a CSS, etc.) y el `<body>` (con un `<div id="root">` para la aplicación renderizada y un `<script>` que carga el bundle del cliente).
   - Se envía la respuesta HTML al navegador.

3. **Hidratación en el Cliente:**
   - El navegador recibe el HTML y muestra el contenido renderizado.
   - En el punto de entrada del cliente (`src/index.jsx`), se utiliza `hydrateRoot` (de `react-dom/client`) para rehidratar la aplicación.
   - Se emplea `<BrowserRouter>` (con flags futuras si es necesario) para manejar la navegación en el lado del cliente.
   - El JavaScript (bundle.js) se carga y la aplicación se vuelve interactiva.

---
## Hooks Personalizados
En este proyecto, hemos implementado un custom hook llamado useFetch para manejar la obtención de datos desde la API de MercadoLibre de manera eficiente y reutilizable. Este hook simplifica las solicitudes HTTP, gestiona automáticamente los estados de carga y error, y mejora la limpieza y mantenibilidad de los componentes.

**useFetch**
El hook useFetch permite realizar solicitudes HTTP de manera sencilla dentro de los componentes React, manejando los estados de carga, datos y errores de forma centralizada.

**Parámetros**
- fetchFunction (Function):
Una función que realiza la solicitud HTTP y retorna una promesa que resuelve con los datos obtenidos. Esta función puede ser una llamada a cualquiera de las funciones definidas en api.js.

-  dependencies (Array):
Un array de dependencias que, cuando cambian, reejecutan la solicitud. Es similar a las dependencias que se pasan a useEffect.

**Retorno**
El hook retorna un objeto con las siguientes propiedades:

- data (Object | null):
Los datos obtenidos de la solicitud HTTP. Inicialmente es null hasta que se complete la solicitud.

- loading (Boolean):
Indica si la solicitud está en curso. Inicialmente es false.

- error (String | null):
Contiene el mensaje de error si la solicitud falla. Inicialmente es null.

- refetch (Function):
Una función que permite reintentar la solicitud manualmente. Útil en casos donde la solicitud falla y deseas permitir al usuario intentar nuevamente. En este caso no se utiliza esa opción 

## Variables de entorno

Este proyecto puede usar **variables de entorno** para centralizar ciertas configuraciones:

- **En el backend** (dentro de `server/.env` o variables del sistema):
  ```bash
  PORT=3001
  API_BASE_URL=https://api.mercadolibre.com

- **En el front** (dentro de `cliet/.env` o variables del sistema):
  ```bash
  REACT_APP_API_URL=http://localhost:3001

## Instalación y ejecución

**Requisitos previos**:
- Node.js (>= 20)
- npm o yarn

**Pasos**:

1. **Clona** este repositorio:
   ```bash
   git clone https://github.com/lualbergipe/challenge-ml.git

2. **Instala** las dependencias desde la raíz:
    ```bash
    cd challenge
    npm install

3. **Instala** las dependencias del frontend y del backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    cd ..

4. **Inicia** la aplicación (cliente + servidor en paralelo) desde la raiz:
    ```bash
    npm run dev

- El servidor quedará disponible en:
    ```bash
    http://localhost:3001

- El frontend quedará disponible en:
    ```bash
    http://localhost:3000