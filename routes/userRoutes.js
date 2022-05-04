//PACKAGES
import { Router } from 'express';

//CONTROLLERS
import { signup, login } from '../controllers/userController.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
