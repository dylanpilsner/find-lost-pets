import * as models from "../models/models";
import { sendSmtpEmail, apiInstance } from "../lib/sendinblue";

export async function reportPet(emailData: {
  phone: number;
  description: string;
  senderName: string;
  userId: number;
  petImage: string;
}) {
  if (!emailData.phone) {
    throw "número de teléfono necesario";
  }

  if (!emailData.description) {
    throw "descripción de último avistamiento necesaria";
  }

  if (!emailData.senderName) {
    throw "nombre de quién reporta necesario";
  }

  if (!emailData.userId) {
    throw "userId de mascota necesario ";
  }

  if (!emailData.petImage) {
    throw "imagen de mascota necesaria";
  }
  const receiverEmail = (await models.User.findByPk(emailData.userId)) as any;

  sendSmtpEmail.subject = "Alguien tiene información de tu mascota!";
  sendSmtpEmail.htmlContent = /*html */ `
  <html>
  <head>
  </head>
  <body>
    <h1 style="text-align:center;">${receiverEmail.first_name}, tenemos novedades de tu mascota!</h1>
  <div class="img-container" style="width:100%; display:flex; justify-content:center;">
  <img src=${emailData.petImage} style="height:200px; border:1px solid black;" />
  </div>
  <h3>${emailData.senderName} dejó la siguiente descripción de dónde la vió:</h3>
  <p>${emailData.description}</p>
  <h4>Te podés contactar con ${emailData.senderName} al siguiente número: ${emailData.phone}</h4>
  <p>Te deseamos mucha suerte con tu búsqueda!</p>
  </body>
  </html>
  `;

  sendSmtpEmail.sender = {
    name: "Find Lost Pets",
    email: "findlostpetsapx@gmail.com",
  };
  sendSmtpEmail.to = [
    { email: receiverEmail.email, name: receiverEmail.first_name },
  ];
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
