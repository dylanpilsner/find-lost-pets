import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Pet extends Model {}

Pet.init(
  {
    name: DataTypes.STRING,
    last_location_lat: DataTypes.FLOAT,
    last_location_lng: DataTypes.FLOAT,
    status: DataTypes.STRING,
    point_of_reference: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
