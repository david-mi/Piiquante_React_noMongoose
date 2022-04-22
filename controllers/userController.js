// CLASSES
import UserSignup from '../Models/user/UserSignup.js';
import UserLogin from '../Models/user/UserLogin.js';
import Connection from '../database.js';

/**
 * @function signup enregistrer un utilisateur dans la base de donneé
 */

export const signup = async (req, res) => {

  const { email: reqEmail, password: reqPassword } = req.body;
  const user = new UserSignup(reqEmail, reqPassword);

  try {
    await user.validData();
    user.encryptEmail();
    await user.isUserRegistered();
    await user.hashPassword();

    const { encryptedEmail: email, hashedPassword: password } = user;
    const dataBaseUsers = Connection.getCollection('users');
    dataBaseUsers.insertOne({ email, password });

    res.status(200).json({ message: 'Utilisateur Créé', user });
  }
  catch (err) {
    const { status, message } = err;
    res.status(status || 500).json(message || err);
  }
};

/**
 * @function login va vérifier si les infos de l'utisateur 
 * correspondent à celles stockées en base de donnée et 
 * renverra un token en réponse
 */

export const login = async (req, res) => {

  const { email: reqEmail, password: reqPassword } = req.body;
  const user = new UserLogin(reqEmail, reqPassword);

  try {
    user.encryptEmail();
    await user.isUserExisting();
    await user.comparePassword();
    user.setToken();

    const { token, _id: userId } = user;

    res.status(200).json({ userId, token });
  }
  catch (err) {
    const { status, message } = err;
    res.status(status || 500).json(message || err);
  }
};

