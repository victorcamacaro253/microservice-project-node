import { Router } from 'express';
import purchaseController from '../controllers/purchaseController.js';

const router = Router();

//Ruta para obtener el listado de las compras
router.get('/',purchaseController.getCompras);


//Ruta para comprar un producto
router.post('/',purchaseController.compraProduct);

//Ruta para eliminar una compra
router.delete('/:id',purchaseController.deleteCompra)


export default router