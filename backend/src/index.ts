import mongoose from "mongoose";
import { app } from "./app";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";

import { articleCreateRouter } from "./routes/article/create";

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false, // http => false || https => true
  })
);

//app.use(express.urlencoded({ extended: true }));

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Mongoose");
} else throw new Error("MONGO_URI must be provided");

if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

app.listen(4000, () => {
  console.log("API listening on port 4000");
});
