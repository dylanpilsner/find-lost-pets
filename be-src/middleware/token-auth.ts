import * as jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.SECRET);
    req._user = data;
    next();
  } catch (err) {
    res.status(401).json({ err });
  }
}

export { authMiddleware };
