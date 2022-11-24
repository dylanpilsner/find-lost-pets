import * as express from "express";
import * as path from "path";
import * as userController from "./controllers/user-controller";
import * as authController from "./controllers/auth-controller";
import { authMiddleware } from "./middleware/methods";
import { User } from "./models/models";
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
// sign up/in
app.post("/user", async (req, res) => {
  const body = req.body;
  console.log(body);
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
  console.log(token);

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

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(express.static(staticDirPath));
app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});
