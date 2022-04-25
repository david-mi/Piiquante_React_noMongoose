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
    .min(1)
    .max(9),

  likes: yup
    .number()
    .default(0),


  dislikes: yup
    .number()
    .default(0),

  usersLiked: yup
    .array()
    .default([]),

  usersDisliked: yup
    .array()
    .default([])
});

export default sauceSchema;