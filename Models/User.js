import * as yup from 'yup';

class User {

  async setNew(email, password) {
    console.log('newww');
    let userSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    await userSchema.validate({ email, password });

    this.email = email;
    this.password = password;
  }

}

export default User;