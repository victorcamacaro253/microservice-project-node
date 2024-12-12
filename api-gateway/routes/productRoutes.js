import {Router} from 'express'
import Product from '../controllers/productController.js'
const router = Router()

router.get('/',Product.getProducts)

router.get('/:id',Product.getProductsById)

router.post('/',Product.addProduct)

router.put('/:id',Product.updateProduct)

router.delete('/:id',Product.deleteProduct)

export default router