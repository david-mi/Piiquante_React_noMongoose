import { ValidationError } from 'yup';
import Sauce from '../Models/sauce/Sauce.js';
import SauceEdit from '../Models/sauce/SauceEdit.js';
import Connection from '../database.js';
import { ObjectId } from 'mongodb';

/**
 * Récupère toutes les sauces stockées dans la base de donnée
 */

export const getAllSauces = async (req, res) => {
  const dataBaseSauces = Connection.getCollection('sauces');
  const sauces = await dataBaseSauces.find().toArray();

  res.status(200).json(sauces);
};

/**
 * Récupère la sauce dans la base de donnée correspondant aux 
 * à l'id passé en paramètres de requête
 */

export const getOneSauce = async (req, res) => {

  const idSauceParams = req.params.id;
  const idSauceDatabase = new ObjectId(idSauceParams);

  const dataBaseSauces = Connection.getCollection('sauces');
  const sauce = await dataBaseSauces.findOne(idSauceDatabase);

  res.status(200).json(sauce);
};


/**
 * Ajoute une sauce dans la collection sauces de la base de donnée 
 * MongoDB
 */

export const addOneSauce = async (req, res) => {

  const sauce = new Sauce(req.tokenUserid);

  try {
    sauce.getImageUrl(req);
    const validSauce = await sauce.validate(req.body.sauce);
    await sauce.set(validSauce);
    await sauce.dbAdd();

    res.status(201).json({ message: 'sauce created' });
  }
  catch (err) {
    await sauce.deleteCurrentFile();
    let errorStatus = '';
    if (err instanceof ValidationError) errorStatus = 400;
    const { message } = err;
    res.status(errorStatus || 500).json({ error: (message || err) });
  }
};

/**
 * éditer une sauce en modifiant l'image ou non
 * @class dd
 */

export const editOneSauce = async (req, res) => {

  const sauce = new SauceEdit(req.tokenUserid);
  const dbSauceId = new ObjectId(req.params.id);

  try {

    const foundDbSauce = await sauce.dbFind(dbSauceId);

    if (req.file) {
      sauce.getImageUrl(req);
      const parsedSauce = JSON.parse(req.body.sauce);
      const updatedSauce = await sauce.validateEdit(foundDbSauce, parsedSauce);
      sauce.setEdited(updatedSauce);
    }
    else {
      const updatedSauce = await sauce.validateEdit(foundDbSauce, req.body);
      sauce.setEdited(updatedSauce);
    }

    sauce.dbReplace(dbSauceId);

    res.status(201).json({ message: 'sauce edited' });
  }
  catch (err) {
    let errorStatus = '';
    if (err instanceof ValidationError) errorStatus = 400;
    const { message } = err;
    res.status(errorStatus || 500).json({ error: (message || err) });
  }
};

export const deleteOneSauce = async (req, res) => {
  res.status(201).json({ message: 'sauce deleted' });
};

export const likeOneSauce = async (req, res) => {
  res.status(201).json({ message: 'sauce liked' });
};

