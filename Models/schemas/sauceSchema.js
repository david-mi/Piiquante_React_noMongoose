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
    .min(1, 'heat ne peut pas être en dessous de 1')
    .max(10, 'heat ne peut pas dépasser 10'),

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