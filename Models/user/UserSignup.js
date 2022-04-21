import User from './User.js';
import bcrypt from 'bcrypt';

class UserSignup extends User {

  constructor(...props) {
    super(...props);
  }

  async hashPassword() {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

}

export default UserSignup;