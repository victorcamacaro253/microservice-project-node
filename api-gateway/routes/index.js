import { Router } from "express"
import user from './userRoutes.js'
import product from './productRoutes.js'
import purchase from './purchaseRoutes.js'
import Public from './publicRoutes.js'
import aunthenticatenToken from '../middleware/authenticationToken.js'


const router = Router()

router.use('/users',aunthenticatenToken, user)
router.use('/products',aunthenticatenToken, product)
router.use('/purchases', aunthenticatenToken,purchase)
router.use('/public',Public)


export default router
