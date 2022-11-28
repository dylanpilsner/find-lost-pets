import "dotenv/config";
import { sequelize } from "./models/connection";
import "./models/models";

(async function () {
  try {
    const sync = await sequelize.sync({ force: true });
    console.log(sync);
  } catch (err) {
    console.log({ err });
  }
})();
