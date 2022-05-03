// CLASSES
import UserSignup from '../Models/user/UserSignup.js';
import UserLogin from '../Models/user/UserLogin.js';

/**
 * @async enregistre un utilisateur dans la base de donnée
 */

export const signup = async (req, res, next) => {

  const { email, password } = req.body;
  const user = new UserSignup(email, password);

  try {
    await user.validData();
    user.encryptEmail();
    await user.isRegistered();
    await user.hashPassword();
    await user.dbAdd();

    res.status(200).json({ message: 'Utilisateur Créé', user });
  }
  catch (err) {
    next(err);
  }
};

/**
 * @async va vérifier si les infos de l'utisateur 
 * correspondent à celles stockées dans le document cherché et 
 * renverra un token d'authentification en réponse
 */

export const login = async (req, res, next) => {

  const { email, password } = req.body;
  const user = new UserLogin(email, password);

  try {
    user.encryptEmail();
    await user.isUserExisting();
    await user.comparePassword();
    user.setToken();

    const { token, userId } = user;
    res.status(200).json({ userId, token });
  }
  catch (err) {
    next(err);
  }
};

