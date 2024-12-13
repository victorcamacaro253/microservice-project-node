import { Router } from 'express';
import UserController from '../controllers/userController.js';
const router = Router();

// CRUD
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/', UserController.createUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

// Ruta de login
router.post('/login', UserController.login);

export default router;
