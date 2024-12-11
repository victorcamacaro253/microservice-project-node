import { Router } from "express"
import user from './userRoutes.js'
import product from './productRoutes.js'
import purchase from './purchaseRoutes.js'



const router = Router()

router.use('/users', user)
router.use('/products', product)
router.use('/purchases', purchase)

export default router
