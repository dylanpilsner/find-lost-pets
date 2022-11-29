import * as express from "express";
import * as path from "path";
import * as userController from "./controllers/user-controller";
import * as authController from "./controllers/auth-controller";
import * as petController from "./controllers/pet-controller";
import { authMiddleware } from "./middleware/methods";
import { User, Auth, Pet } from "./models/models";
import * as cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cors());

app.get("/test", async (req, res) => {
  const todos = await Pet.findAll();
  res.json({ todos });
});

app.delete("/delete", async (req, res) => {
  const borrar = await User.destroy({ where: { id: req.body.id } });
  res.json(borrar);
});

// sign up/in
app.post("/user", async (req, res) => {
  const body = req.body;
  try {
    const createUserResponse = await userController.createUser(body);
    res.json({ createUserResponse });
  } catch (err) {
    res.json({ err });
  }
});

app.post("/user/token", async (req, res) => {
  const { body } = req;

  const token = await authController.assignToken(body);
  res.json({ token });
});

app.post("/verify-user", async (req, res) => {
  const { body } = req;

  try {
    const verifiedEmail = await userController.verifyEmail(body.email);
    res.json({ verifiedEmail });
  } catch (err) {
    res.json({ err });
  }
});

app.get("/user", async (req, res) => {
  const todos = await User.findAll();
  res.json({ todos });
});

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await userController.getProfile(req._user.id);
  res.json(user);
});

app.post("/update-name", authMiddleware, async (req, res) => {
  const { body } = req;

  try {
    const updatedUser = await userController.updateFirstName(
      req._user.id,
      body.first_name
    );
    res.json({ updatedUser });
  } catch (err) {
    res.json({ err });
  }
});
app.post("/update-password", authMiddleware, async (req, res) => {
  const { body } = req;

  try {
    const updatedUser = await authController.updatePassword(
      req._user.id,
      body.password
    );
    res.json({ changeStatus: updatedUser.passwordChanged });
  } catch (err) {
    res.json({ err });
  }
});

app.post("/report-lost-pet", authMiddleware, async (req, res) => {
  const {
    name,
    last_location_lat,
    last_location_lng,
    pictureURL,
    point_of_reference,
  } = req.body;
  try {
    const newReportedPet = await petController.createNewReportedPet({
      name,
      last_location_lat,
      last_location_lng,
      pictureURL,
      point_of_reference,
      userId: req._user.id,
    });
    res.json(newReportedPet);
  } catch (err) {
    res.json({ err });
  }
});

app.get("/get-my-pets", authMiddleware, async (req, res) => {
  try {
    const myReportedPets = await userController.getMyReportedPets(req._user.id);
    res.json(myReportedPets);
  } catch (err) {
    res.json({ err });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(express.static(staticDirPath));
app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});
