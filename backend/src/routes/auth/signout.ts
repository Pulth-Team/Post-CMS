import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/auth/signout", (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
