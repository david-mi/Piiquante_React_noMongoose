import * as yup from 'yup';

const sauceSchema = yup.object().shape({
  userId: yup
    .string()
    .required(),

  name: yup
    .string()
    .required(),

  manufacturer: yup
    .string()
    .required(),

  description: yup
    .string()
    .required(),

  mainPepper: yup
    .string()
    .required(),

  imageUrl: yup
    .string()
    .required(),

  heat: yup
    .number()
    .required()
    .min(1, 'Le heat ne peut pas être en dessous de 1')
    .max(9, 'Le heat ne peut pas dépasser 9'),

  likes: yup
    .number()
    .default(0),

  dislikes: yup
    .number(),

  usersLiked: yup
    .array(),

  usersDisliked: yup
    .array()
});

export default sauceSchema;