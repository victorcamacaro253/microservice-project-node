import { Router } from "express"
import user from './userRoutes.js'
import product from './productRoutes.js'
import purchase from './purchaseRoutes.js'
import Public from './publicRoutes.js'
import aunthenticatenToken from '../middleware/authenticationToken.js'


const router = Router()

router.use('/users', user)
router.use('/products', product)
router.use('/purchases',purchase)
router.use('/public',Public)


export default router
