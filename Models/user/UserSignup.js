// PACKAGES
import bcrypt from 'bcrypt';

// CLASSES
import { User } from '../modelsIndexes.js';

/**
 * Regroupe les méthodes communes pour l'inscription des utilisateurs
 */

class UserSignup extends User {

  /**
   * @async va hash le mot de pass via bcrypt
   * @constructs this.hashedPassword
   */

  async hashPassword() {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  /**
   * Regarde si l'email de la requête n'est pas déjà inscrit dans la base de donnée
   * @throws une erreur si l'email est déjà enregistré dans la base de donnée
   */

  async isRegistered() {
    const userRegistered = await this.dbUsers.findOne({ email: this.email });
    if (userRegistered) {
      throw (({ message: "Cet utilisateur est déjà inscrit !", status: 409 }));
    }
  }

  async dbAdd() {
    await this.dbUsers.insertOne(this);
  }
}

export default UserSignup;