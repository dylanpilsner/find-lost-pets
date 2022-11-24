import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

function hashPassword(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

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

export { hashPassword, authMiddleware };
