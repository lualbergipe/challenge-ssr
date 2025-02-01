// server/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js'; // Importa las rutas principales
require('dotenv').config(); 

// Para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3200;

// Sirve archivos estáticos (bundle.js, styles.css, etc.)
app.use(express.static(path.resolve(__dirname, '../public')));

// Monta las rutas principales (SSR y API)
app.use('/', routes);

app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto ${PORT}`)
);
