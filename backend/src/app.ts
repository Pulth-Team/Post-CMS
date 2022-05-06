import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import cookieSession from "cookie-session";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";

import { articleCreateRouter } from "./routes/article/create";
import { articleUserRouter } from "./routes/article/user";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    signed: false,
    secure: false, // http => false || https => true
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(articleCreateRouter);
app.use(articleUserRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
