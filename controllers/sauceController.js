import { ValidationError } from 'yup';
import Sauce from '../Models/sauce/Sauce.js';

export const getAllSauces = (req, res) => {
  res.status(200).json({ message: 'all sauce' });
};

export const getOneSauce = (req, res) => {
  res.status(200).json({ message: 'one sauce' });
};

export const addOneSauce = async (req, res) => {
  const sauce = new Sauce(req.tokenUserid);

  try {
    sauce.getImageUrl(req);
    await sauce.addOneSauce(req.body.sauce);
    res.status(201).json({ message: 'sauce created' });
  }
  catch (err) {
    let errorStatus = '';
    if (err instanceof ValidationError) errorStatus = 400;
    const { message } = err;
    res.status(errorStatus || 500).json({ error: (message || err) });
  }
};

export const editOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce edited' });
};

export const deleteOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce deleted' });
};

export const likeOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce liked' });
};

