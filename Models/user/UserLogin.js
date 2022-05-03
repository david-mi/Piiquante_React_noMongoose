// PACKAGES
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// CLASSES
import User from './User.js';
import Connection from '../../database.js';

config();

/**
 * Contient des méthodes servant le controller login
 * 
 * @method isUserExisting regarde l'utilisateur existe dans la base de donnée
 * @method comparePassword compare le mot de passe de la requête avec celui stocké dans la base de donnée
 * @method setuser Ajoute un utilisateur dans la base de donnée 
 * @method setToken construit un token
 */

class UserLogin extends User {

  /**
   * @async Regarde si l'email de la requête existe dans la base de donnée. Si il n'existe pas
   * @function setUser 
   * @throws Une erreur si l'utilisateur n'existe pas dans la base de donnée
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
   * @async Compare le mot de passe du body avec celui crypté dans la base de donnée
   * si le mot de passe n'est pas le bon, une erreur est renvoyée
   */

  async comparePassword() {
    const compare = await bcrypt.compare(this.password, this.hashedPassword);
    if (!compare) {
      throw ({ message: "Mot de passe incorrect !", status: 401 });
    }
  }

  /**
   * ajoute 
   * 
   * @param {object} userInfos objet contenant les infos de l'utilisateur
   * @constructs this.hashedPassword Mot de passe de l'utilisateur hash via bcrypt
   * @constructs this._id 
   * trouvé dans la base de donnée
   * @constructs this.encryptedEmail Email de l'utilisateur
   */

  setUser(userInfos) {
    const { _id, email, password } = userInfos;

    this.hashedPassword = password;
    this.userId = _id;
    this.encryptedEmail = email;
  }

  /**
   * Mets en place un token via JWT, avec un userId, une clé secrête
   * et une date d'expiration
   * 
   * @constructs this.token token d'authentification, contenant aussi l'userId
   * en payload
   */

  setToken() {
    const { TOKEN_SECRET } = process.env;
    // const userId = this._id;
    const token = jwt.sign({ userId: this.userId }, TOKEN_SECRET, { expiresIn: '24h' });
    this.token = token;
  }
}

export default UserLogin;