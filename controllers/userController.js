import Connection from '../database.js';
import User from '../Models/User.js';

/**
 * @function signup enregistrer un utilisateur dans la base de donneé
 */

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = Connection.getCollection('users');

    const isUserExisting = await users.findOne({ email });
    if (isUserExisting) {
      return res.status(409).json({ message: "Cet email est déjà inscrit !" });
    }

    console.log('issou');
    const user = new User();
    console.log({ user });
    await user.setNew('jean@gmail.', 'jean');
    console.log(user);
    // users.insertOne({ email, password });

    // console.log('bonjour');

    res.status(200).json({ message: 'Utilisateur Créé', user });
  }
  catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const users = Connection.getCollection('users');
  const getAll = await users.find().toArray();
  res.status(200).json(getAll);
};

export const getAllUsers = async (req, res) => {
  const users = Connection.getCollection('users');
  const getAll = await users.find().toArray();
  res.status(200).json(getAll);
};