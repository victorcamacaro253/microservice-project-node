import { Router } from "express"
import User from "../controllers/userController.js"


const router = Router()



router.get('/',User.getUsers)


router.use('/:id',User.getUserById)

router.post('/',User.createUser)

router.put('/:id',User.updateUser)

router.delete('/:id',User.deleteUser)




export default router;