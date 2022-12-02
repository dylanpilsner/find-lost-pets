import * as express from "express";
import * as path from "path";
import * as userController from "./controllers/user-controller";
import * as authController from "./controllers/auth-controller";
import * as petController from "./controllers/pet-controller";
import { authMiddleware } from "./middleware/methods";
import { User, Auth, Pet } from "./models/models";
import * as cors from "cors";
import * as sendgrid from "@sendgrid/mail";
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
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "dylan.pilsner@gmail.com",
    from: "findlostpetsapx@gmail.com", // Use the email address or domain you verified above
    subject: "Hello World!",
    text: "Testeando API de Sendgrid",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const mailsentRes = await sendgrid.send(msg);
  res.json({ message: "mail enviado", response: mailsentRes });

  // try {
  //   const test = await sendgrid.send(msg);
  //   res.json({ test });
  // } catch (error) {
  //   console.error(error);

  //   if (error.response) {
  //     console.error(error.response.body);
  //   }
  // }
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

app.get("/get-my-reported-pets", authMiddleware, async (req, res) => {
  try {
    const myReportedPets = await userController.getMyReportedPets(req._user.id);
    res.json(myReportedPets);
  } catch (err) {
    res.json({ err });
  }
});
app.put("/pet/:id", authMiddleware, async (req, res) => {
  const { name, lat, lng, pictureURL, point_of_reference } = req.body;
  const { id } = req.params;

  try {
    const updatedPet = await petController.editPet({
      name,
      last_location_lat: lat,
      last_location_lng: lng,
      pictureURL,
      point_of_reference,
      id,
    });
    res.json(updatedPet);
  } catch (err) {
    res.json({ err });
  }
});

app.put("/pet-status/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedStatus = await petController.changetPetStatus(status, id);
    res.json(updatedStatus);
  } catch (err) {
    res.json({ err });
  }
});

app.delete("/pet/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await petController.deletePost(id);
    res.json(deletedPet);
  } catch (err) {
    res.json({ err });
  }
});

app.get("/near-lost-pets", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const foundNearLostPets = await petController.getNearLostPets(lat, lng);
    res.json(foundNearLostPets);
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
