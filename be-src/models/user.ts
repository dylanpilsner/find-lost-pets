import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
