import mongoose from "mongoose";
import { app } from "./app";

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Mongoose");
} else throw new Error("MONGO_URI must be provided");

if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error("AWS_ACCESS_KEY_ID must be provided");

if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error("AWS_SECRET_ACCESS_KEY must be provided");

app.listen(4000, () => {
  console.log("API listening on port 4000");
});
