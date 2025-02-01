import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Importa el CSS solo si estamos en el navegador
if (typeof window !== 'undefined') {
  // Requiere el CSS de ReactToastify
  require('react-toastify/dist/ReactToastify.css');
}
const container = document.getElementById('root');

hydrateRoot(
  container,
  <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
  <App />
</BrowserRouter>
);