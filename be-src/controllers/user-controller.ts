import * as models from "../models/models";
import { hashPassword } from "../middleware/methods";

async function createUser(userInformation: {
  email: string;
  first_name: string;
  password: string;
}) {
  const { email, first_name, password } = userInformation;

  if (!email || !first_name || !password) {
    throw "información de usuario faltante";
  }

  const [user, createdUser] = await models.User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      email,
      first_name: first_name,
    },
  });

  const [auth, createdAuth] = await models.Auth.findOrCreate({
    where: {
      userId: user.get("id"),
    },
    defaults: {
      email,
      password: hashPassword(password),
    },
  });

  return { createdAuth };
}

async function verifyEmail(email: string) {
  if (!email) {
    throw "Falta email";
  }

  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
}

export { createUser, verifyEmail };
