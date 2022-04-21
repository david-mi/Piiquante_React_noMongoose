// PACKAGES
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// CLASSES
import User from './User.js';
import Connection from '../../database.js';

config();

/**
 * @class UserLogin qui hérite de User
 * contient des méthodes servant le controller login
 * @method isUserExisting
 * @method comparePassword
 * @method setuser
 * @method setToken
 */

class UserLogin extends User {

  constructor(...props) {
    super(...props);
  }

  /**
   * Regarde si l'email de la requête existe dans la base de donnée. Si il n'existe pas
   * une erreur est renvoyée, sinon on passe l'utilisateur trouvé à setUser 
   */

  async isUserExisting() {
    const usersList = Connection.getCollection('users');
    const foundUser = await usersList.findOne({ email: this.email });

    if (!foundUser) {
      throw ({ message: "Cet utilisateur n'existe pas !", status: 404 });
    }

    this.setUser(foundUser);
  }

  /**
   * Compare le mot de passe du body avec celui crypté dans la base de donnée
   * si le mot de passe n'est pas le bon, une erreur est renvoyée
   */

  async comparePassword() {
    const compare = await bcrypt.compare(this.password, this.hashedPassword);
    if (!compare) {
      throw ({ message: "Mot de passe incorrect !", status: 401 });
    }
  }

  /**
   * @param {object} userInfos objet contenant les infos de l'utilisateur
   * trouvé dans la base de donnée
   */

  setUser(userInfos) {
    const { _id, email, password } = userInfos;

    this.hashedPassword = password;
    this._id = _id;
    this.encryptedEmail = email;
  }

  /**
   * Mets en place un token via JWT, avec un userId, une clé secrête
   * et une date d'expiration
   */

  setToken() {
    const { TOKEN_SECRET } = process.env;
    const userId = this._id;
    const token = jwt.sign({ userId }, TOKEN_SECRET, { expiresIn: '24h' });
    this.token = token;
  }
}

export default UserLogin;