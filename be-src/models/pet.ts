import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Pet extends Model {}

Pet.init(
  {
    name: DataTypes.STRING,
    last_location_lat: DataTypes.NUMBER,
    last_location_lng: DataTypes.NUMBER,
    status: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
