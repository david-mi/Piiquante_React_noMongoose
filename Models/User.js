import bcrypt from 'bcrypt';
import Connection from '../database.js';
import userSchema from './schemas/userShema.js';

class User {

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async validData() {
    await userSchema.validate(
      {
        email: this.email,
        password: this.password
      }
    );

    return this;
  }

  async isUserExisting() {
    const usersList = Connection.getCollection('users');
    const findUser = await usersList.findOne({ email: this.email });

    if (findUser) {
      throw ({ message: "Cet email est déjà inscrit !", status: 409 });
    }

    return this;
  }

  async cryptPassword() {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    return this;
  }
}

export default User;