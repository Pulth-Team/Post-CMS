import mongoose from "mongoose";
import { app } from "./app";

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Mongoose");
} else throw new Error("MONGO_URI must be provided");

if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

app.listen(4000, () => {
  console.log("API listening on port 4000");
});
