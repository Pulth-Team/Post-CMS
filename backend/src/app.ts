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
import { checkUserRouter } from "./routes/auth/check-user";

import { articleCreateRouter } from "./routes/article/create";
import { articleUserRouter } from "./routes/article/user";
import { articleSlugRouter } from "./routes/article/slug";
import { articleExploreRouter } from "./routes/article/explore";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

//app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false, // http => false || https => true
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(checkUserRouter);

app.use(articleExploreRouter);
app.use(articleCreateRouter);
app.use(articleUserRouter);
app.use(articleSlugRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
