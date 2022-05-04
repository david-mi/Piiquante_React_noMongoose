//PACKAGES
import { Router } from 'express';

//CONTROLLERS
import * as sauce from '../controllers/sauceController.js';

//MIDDLEWARES
import multer from '../middlewares/multer.js';

const router = Router();

router.get('/', sauce.getAllSauces);
router.post('/', multer, sauce.addOneSauce);

router.get('/:id', sauce.getOneSauce);
router.put('/:id', multer, sauce.editOneSauce);
router.delete('/:id', sauce.deleteOneSauce);

router.post('/:id/like', sauce.likeOneSauce);

export default router;