import express from "express";
import "express-async-errors";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(4000, () => {
  console.log("API listening on port 4000");
});
