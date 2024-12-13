import { Router } from 'express';
import productController from '../controllers/productController.js';
const router = Router();

// CRUD
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.get('/stock/:id',productController.getProductStock)

router.put('/stock/update/:id',productController.updateProductStock)

router.put('/topSelling/:id',productController.updateTopSelling)

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);



export default router;