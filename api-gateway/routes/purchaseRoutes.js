import {Router} from 'express'
import Purchase from '../controllers/purchaseController.js'
const router = Router()

router.get('/',Purchase.getPurchases)

router.get('/:id',Purchase.getPurchasesById)

router.post('/',Purchase.createPurchase)

router.put('/:id',Purchase.updatePurchase)

router.delete('/:id',Purchase.deletePurchase)

export default router