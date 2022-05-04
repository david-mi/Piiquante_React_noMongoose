//PACKAGES
import { Router } from 'express';

//CONTROLLERS
import * as sauce from '../controllers/sauceController.js';

//MIDDLEWARES
import multer from '../middlewares/multer.js';
import userIdCompare from '../middlewares/userIdCompare.js';

const router = Router();

router.get('/', sauce.getAllSauces);
router.post('/', multer, sauce.addOneSauce);

router.get('/:id', sauce.getOneSauce);
router.put('/:id', userIdCompare, multer, sauce.editOneSauce);
router.delete('/:id', userIdCompare, sauce.deleteOneSauce);

router.post('/:id/like', sauce.likeOneSauce);

export default router;