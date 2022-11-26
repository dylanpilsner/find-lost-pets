import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Auth extends Model {}

Auth.init(
  {
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "auth" }
);
