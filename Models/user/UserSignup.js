// PACKAGES
import bcrypt from 'bcrypt';

// CLASSES
import User from './User.js';
import Connection from '../../database.js';

/**
 * contenant des méthodes servant le controller signup
 * @extends User
 * @method hashPassword hash du mot de passe
 * @method isUserRegistered vérification si un utilisateur est déjà enregistré
 */

class UserSignup extends User {

  /**
   * @async va hash le mot de pass via bcrypt
   * @constructs this.hashedPassword
   */

  async hashPassword() {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.hashedPassword = hashedPassword;
  }

  /**
   * Regarde si l'email de la requête n'est pas déjà inscrit dans la base de donnée
   * @throws une erreur si l'email est déjà enregistré dans la base de donnée
   */

  async isUserRegistered() {

    const usersList = Connection.getCollection('users');
    const userRegistered = await usersList.findOne({ email: this.encryptedEmail });
    if (userRegistered) {
      throw (({ message: "Cet utilisateur est déjà inscrit !", status: 409 }));
    }
  }
}

export default UserSignup;