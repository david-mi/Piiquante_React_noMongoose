import User from '../Models/User.js';

/**
 * @function signup enregistrer un utilisateur dans la base de donneé
 */

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User(email, password);
    await user.isUserExisting();
    await user.validData();
    await user.cryptPassword();
    // users.insertOne({ ...user });

    // console.log('bonjour');

    res.status(200).json({ message: 'Utilisateur Créé', user });
  }
  catch (err) {
    const { status, message } = err;
    res.status(500 || status).json(message || err);
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