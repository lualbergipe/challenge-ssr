import express from 'express';
import mainController from '../controllers/mainController.js';
import itemsRoutes from './items.js'

const router = express.Router();

//Rutas de la api
router.use('/api/items', itemsRoutes);

//Todas las demás rutas se manejarán mediante SSR
router.get('*', mainController.renderApp);

export default router;
