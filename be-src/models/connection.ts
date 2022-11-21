import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "vlugzxwqxwgcox",
  password: "312519f0ebbc2df9e22db666129a4f461cdf36425350a64ec720d5f538538417",
  database: "d17bji8v9kv7e6",
  port: 5432,
  host: "ec2-54-86-214-124.compute-1.amazonaws.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await sequelize.sync();
})();
