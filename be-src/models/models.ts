import { User } from "./user";
import { Report } from "./report";
import { Pet } from "./pet";
import { Auth } from "./auth";

// Un usuario tiene un auth
User.hasOne(Auth);
Auth.belongsTo(User);

// Un usuario puede tener muchas mascotas
User.hasMany(Pet);
Pet.belongsTo(User);

// Una mascota puede tener muchos reports
Pet.hasMany(Report);
Report.belongsTo(Pet);

export { User, Report, Pet, Auth };
