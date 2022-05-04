//PACKAGES
import * as yup from 'yup';

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format d'email incorrect")
    .required('Champ Requis'),

  password: yup
    .string()
    .required('Champ Requis')
    .trim()
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins 1 minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins 1 majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre'),
});

export default userSchema;