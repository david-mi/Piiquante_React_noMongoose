//PACKAGES
import { ObjectId } from 'mongodb';
//CLASSES
import { SauceDb } from '../models/modelsIndexes.js';

export default async (req, res, next) => {
  const userIdToken = req.tokenUserid;
  const sauceId = new ObjectId(req.params.id);

  try {
    const sauceDb = await SauceDb.getOne(sauceId);
    if (sauceDb.userId !== userIdToken) {
      throw ({ error: "Ce n'est pas votre sauce !" });
    }
    next();
  }
  catch (err) {
    res.status(401).json(err);
  }
};