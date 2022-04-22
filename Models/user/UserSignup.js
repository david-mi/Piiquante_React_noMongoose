// PACKAGES
import bcrypt from 'bcrypt';

// CLASSES
import User from './User.js';
import Connection from '../../database.js';

/**
 * @class UserSignup qui hérite de User,
 * contenant des méthodes servant le controller signup
 * @method hashPassword
 * @method isUserRegistered
 */

class UserSignup extends User {

  async hashPassword() {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.hashedPassword = hashedPassword;
  }

  /** Regarde si l'email de la requête n'est pas déjà inscrit dans la base de donnée */

  async isUserRegistered() {

    const usersList = Connection.getCollection('users');
    const userRegistered = await usersList.findOne({ email: this.encryptedEmail });
    if (userRegistered) {
      throw (({ message: "Cet utilisateur est déjà inscrit !", status: 409 }));
    }
  }

}

export default UserSignup;