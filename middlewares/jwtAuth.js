import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const bearer = req.get('Authorization');
    if (!bearer) throw ({ message: "Vous n'êtes pas authentifié" });

    const token = bearer.match(/(?<=Bearer ).+/)[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.tokenUserid = decodedToken.userId;

    next();
  }
  catch (err) {
    const { message } = err;
    res.status(401).json({ message });
  }
};