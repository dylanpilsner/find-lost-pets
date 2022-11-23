import { sequelize } from "./models/connection";
import "./models/models";

(async function () {
  const sync = await sequelize.sync({ alter: true });
  console.log(sync);
})();
