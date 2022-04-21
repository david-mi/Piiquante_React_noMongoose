// PACKAGES
import cryptoJs from 'crypto-js';
import { config } from 'dotenv';
// CLASS
import Connection from '../../database.js';
// SCHEMAS
import userSchema from '../schemas/userShema.js';

config();

/**
 * @class User qui va regrouper les méthodes communes 
 * pour la création et l'authentification d'un utilisateur
 */

class User {

  /**
   * @param {string} email - email récupéré dans le body
   * @param {string} password - mot de passe récupéré dans le body
   */

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  /** Applique le schéma yup sur l'email et le mot de passe
   *  pour vérifier si ils sont conforme */

  async validData() {

    await userSchema.validate(
      {
        email: this.email,
        password: this.password
      }
    );
  }

  /** Regarde si l'email de la requête n'est pas déjà inscrit dans la base de donnée */

  async isUserRegistered() {

    const usersList = Connection.getCollection('users');
    const userRegistered = await usersList.findOne({ email: this.encryptedEmail });

    if (userRegistered) {
      throw (({ message: "Cet utilisateur est déjà inscrit !", status: 409 }));
    }
  }

  /** encrypte l'email via cryptoJs et le place dans le constructeur */

  encryptEmail() {

    const { EMAIL_SECRET } = process.env;
    const encryptedEmail = cryptoJs.SHA256(this.email, EMAIL_SECRET).toString();

    this.encryptedEmail = encryptedEmail;
  }
}

export default User;



