import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";

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

export { app };
