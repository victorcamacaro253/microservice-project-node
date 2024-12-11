import { Router } from "express"
import User from "../controllers/userController.js"


const router = Router()

router.use('/:id',User.getUserById)

export default router;