import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../src/App.jsx'; 
import { StaticRouter } from 'react-router-dom/server';

/* Este archivo es el encargado de generar el html completo desde el servidor 
(SSR, Server-Side Rendering) 
*/

const renderApp = (req, res) => {
  const context = {};
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>MercadoChallenge</title>
        <link rel="icon" href="/Logo_ML.png" />
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
};

export default { renderApp };
