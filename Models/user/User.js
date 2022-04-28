// PACKAGES
import cryptoJs from 'crypto-js';
import { config } from 'dotenv';

// SCHEMAS
import userSchema from '../schemas/userShema.js';

config();

/**
 * Va regrouper les méthodes communes 
 * pour la création et l'authentification d'un utilisateur
 * 
 * @method validData Vérifie le format des données via un schéma yup
 * @method encryptEmail Chiffre l'email avec cryptoJs
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

  /** 
   * encrypte l'email via cryptoJs et le place dans le constructeur
   * 
   * @constructs encryptedEmail l'email chiffré avec crypto js
   */

  encryptEmail() {
    const { EMAIL_SECRET } = process.env;
    const encryptedEmail = cryptoJs.SHA256(this.email, EMAIL_SECRET).toString();

    this.encryptedEmail = encryptedEmail;
  }
}

export default User;



