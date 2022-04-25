import { Router } from 'express';
const router = Router();
import * as sauce from '../controllers/sauceController.js';

router.get('/', sauce.getAllSauces);
router.post('/', sauce.addOneSauce);

router.get('/:id', sauce.getOneSauce);
router.put('/:id', sauce.editOneSauce);
router.delete('/:id', sauce.deleteOneSauce);

router.post('/:id/like', sauce.likeOneSauce);

export default router;