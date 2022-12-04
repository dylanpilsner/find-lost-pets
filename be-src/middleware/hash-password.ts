import * as crypto from "crypto";
function hashPassword(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export { hashPassword };
