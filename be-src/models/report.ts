import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Report extends Model {}

Report.init(
  {
    reporter: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    message: DataTypes.TEXT,
  },
  { sequelize, modelName: "report" }
);
