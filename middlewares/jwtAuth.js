import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  console.log('issou');
  try {
    const bearer = req.get('Authorization');
    if (!bearer) throw ({ message: "Vous n'êtes pas authentifié" });

    const token = bearer.match(/(?<=Bearer ).+/)[0];
    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  }
  catch (err) {
    const { message } = err;
    res.status(401).json({ message });
  }
};