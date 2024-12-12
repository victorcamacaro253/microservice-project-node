import {Router} from 'express'
import User from "../controllers/userController.js"


const router = Router()

router.post('/users',User.login)



export default router