import * as SibApiV3Sdk from "sib-api-v3-typescript";

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi() as any;

let apiKey = apiInstance.authentications["apiKey"];

apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export { apiInstance, sendSmtpEmail };
