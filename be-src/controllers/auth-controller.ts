import * as models from "../models/models";
import { hashPassword } from "../middleware/methods";
import * as jwt from "jsonwebtoken";

export async function assignToken(authInformation: {
  email: string;
  password: string;
  full_name: string;
}) {
  const { email, password } = authInformation;

  if (!email || !password) {
    throw "información de autenticación faltante";
  }
  const hashedPassword = hashPassword(password);
  const auth = await models.Auth.findOne({
    where: {
      email,
      password: hashedPassword,
    },
  });

  if (auth) {
    const token = jwt.sign({ id: auth.get("userId") }, process.env.SECRET);
    return { token, authenticationCompleted: true };
  } else {
    return {
      message: "email or pass incorrect",
      authenticationCompleted: false,
    };
  }
}

export async function updatePassword(id: number, updatedPassword: string) {
  if (!id) {
    throw "falta id";
  }

  if (!updatedPassword) {
    throw "falta nueva contraseña";
  }

  const findedUser = await models.Auth.findOne({
    where: {
      id,
    },
  });

  const oldPassword = findedUser.get("password");

  const hashedPassword = hashPassword(updatedPassword);

  if (hashedPassword == oldPassword) {
    return { passwordChanged: false };
  }
  const updatedUser = await models.Auth.update(
    { password: hashedPassword },
    {
      where: {
        id: id,
      },
    }
  );

  return { passwordChanged: true };
}
