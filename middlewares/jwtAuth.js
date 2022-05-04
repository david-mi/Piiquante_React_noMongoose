import jwt from 'jsonwebtoken';

/**
 * @middleware
 * regarde si il y a bien un token dans les headers de la requête
 * et si il est valide. Le token serra décodé, l'userId en sera 
 * extrait et stocké dans @req sous le nom @tokenUserId
 */

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