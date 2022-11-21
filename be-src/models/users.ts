import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
  },
  { sequelize, modelName: "User" }
);
