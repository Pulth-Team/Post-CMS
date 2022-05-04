import express from "express";

const app = express();

app.all("*", (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log("API listening on port 4000");
});
