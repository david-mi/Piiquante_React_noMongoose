//PACKAGES
import cryptoJs from 'crypto-js';
import { config } from 'dotenv';

//CLASSES
import Connection from '../../database.js';

//SCHEMAS
import { userSchema } from '../modelsIndexes.js';

//ENV
config();

/**
 * Regroupe les méthodes communes pour la gestion des utilisateurs
 */

class User {

  /**
   * @param {string} reqEmail - email récupéré dans le body
   * @param {string} reqPassword - mot de passe récupéré dans le body
   */

  constructor(reqEmail, reqPassword) {
    this.email = reqEmail;
    this.password = reqPassword;
  }

  /** 
   * @async Applique le schéma yup sur l'email et le mot de passe
   *  pour vérifier si ils sont conforme 
   */

  async validData() {
    await userSchema.validate(
      {
        email: this.email,
        password: this.password
      }
    );
  }

  /** @getter Retourne La collection users */

  get dbUsers() {
    return Connection.getCollection('users');
  }

  /** 
   * Encrypte l'email via cryptoJs et le place dans le constructeur
   * 
   * @constructs encryptedEmail l'email chiffré avec crypto js
   */

  encryptEmail() {
    const { EMAIL_SECRET } = process.env;
    const encryptedEmail = cryptoJs.SHA256(this.email, EMAIL_SECRET).toString();

    this.email = encryptedEmail;
  }
}

export default User;



