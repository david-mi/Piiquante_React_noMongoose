import { signup, login, getAllUsers } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', getAllUsers);

export default router;
