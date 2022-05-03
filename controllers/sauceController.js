// PACKAGES
import { ObjectId } from 'mongodb';

// CLASSES
import Sauce from '../Models/sauce/Sauce.js';
import SauceEdit from '../Models/sauce/SauceEdit.js';
import SauceDb from '../Models/sauce/SauceDb.js';

/**
 * @async getAllSauces
 * Récupère toutes les sauces stockées dans la base de donnée
 */

export const getAllSauces = (req, res) => {
  SauceDb.getAll()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => next(err));
};

/**
 * @async Récupère la sauce dans la base de donnée correspondant aux 
 * à l'id passé en paramètres de requête
 */

export const getOneSauce = (req, res, next) => {

  const idSauceParams = req.params.id;
  const idSauceDatabase = new ObjectId(idSauceParams);

  SauceDb.getOne(idSauceDatabase)
    .then(foundSauce => res.status(200).json(foundSauce))
    .catch(err => next(err));
};

/**
 * @async Ajoute une sauce dans la base de donnée 
 * MongoDB
 */

export const addOneSauce = async (req, res, next) => {

  const sauce = new Sauce(req.tokenUserid);

  try {
    sauce.getImageUrl(req);
    const validSauce = await sauce.validate(req.body.sauce);
    sauce.set(validSauce);
    await sauce.dbAdd();

    res.status(201).json({ message: 'sauce created' });
  }
  catch (err) {
    req.sauce = sauce;
    next(err);
  }
};

/**
 * @async remplace les informations d'une sauce en modifiant l'image ou non
 */

export const editOneSauce = async (req, res) => {

  const sauce = new SauceEdit(req.tokenUserid);
  const dbSauceId = new ObjectId(req.params.id);

  try {
    let parsedSauce;

    if (req.file) {
      sauce.getImageUrl(req);
      parsedSauce = JSON.parse(req.body.sauce);
    }

    const foundDbSauce = await SauceDb.getOne(dbSauceId);
    const updatedSauce = await sauce.validateEdit(foundDbSauce, parsedSauce ?? req.body);
    sauce.setEdited(updatedSauce);
    await sauce.dbReplace(dbSauceId);
    req.file && await sauce.handleFileDelete(foundDbSauce.imageUrl);

    res.status(201).json({ message: 'sauce edited' });
  }
  catch (err) {
    next(err);
  }
};

/**
 * @async supprime un document sauce de la base de donnée
 * supprime également l'image associée à cette sauce du dossier /images
 */

export const deleteOneSauce = async (req, res) => {

  const dbSauceId = new ObjectId(req.params.id);
  const sauce = new SauceEdit(req.tokenUserid);

  await sauce.delete(dbSauceId)
    .then(() => res.status(201).json({ message: 'sauce deleted' }))
    .catch(err => next(err));
};

export const likeOneSauce = async (req, res) => {
  res.status(201).json({ message: 'sauce liked' });
};

