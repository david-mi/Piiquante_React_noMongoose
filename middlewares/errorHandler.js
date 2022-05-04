import { ValidationError } from 'yup';

export default async (err, req, res, next) => {

  const { message } = err;
  let status = null;

  if (req.file) {
    const sauce = req.sauce;
    await sauce.handleFileDelete(sauce.imageUrl);

    if (err instanceof ValidationError) {
      status = 400;
    }
  }
  else {
    status = err.status;
  }

  return res.status(status || 500).json({ error: (message || err) });
};