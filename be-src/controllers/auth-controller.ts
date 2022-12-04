import * as models from "../models/models";
import { hashPassword } from "../middleware/hash-password";
import { sendSmtpEmail, apiInstance } from "../lib/sendinblue";
import * as jwt from "jsonwebtoken";

function generateRandomPassword() {
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
}

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

export async function recoverPassword(email: string) {
  const user = (await models.Auth.findOne({
    where: {
      email,
    },
  })) as any;

  const randomPass = generateRandomPassword();
  const hashedPassword = hashPassword(randomPass);

  const passwordRecovered = await models.Auth.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        email,
      },
    }
  );

  sendSmtpEmail.subject = "Recuperación de contraseña";
  sendSmtpEmail.htmlContent = /*html */ `
  <html>
  <head>
  </head>
  <body>
    <h1 style="text-align:center;">${user.first_name}, recibimos tu solicitud de recuperación de contraseña</h1>
  <h3>Podés ingresar nuevamente con la siguiente clave, y luego cambiarla:</h3>
  <h3>${randomPass}</h3>
  <h4>Saludos!</h4>
  </body>
  </html>
  `;

  sendSmtpEmail.sender = {
    name: "Find Lost Pets",
    email: "findlostpetsapx@gmail.com",
  };
  sendSmtpEmail.to = [{ email: user.email, name: user.first_name }];
  sendSmtpEmail.replyTo = {
    email: "findlostpetsapx@gmail.com",
    name: "Find Lost Pets",
  };

  try {
    const sentEmail = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return sentEmail;
  } catch (err) {
    return { err };
  }
}
