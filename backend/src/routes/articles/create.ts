import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

router.post(
  "/api/articles/create",
  requireAuth,
  (req: Request, res: Response) => {
    res.send(req.currentUser);
  }
);

export { router as createRouter };
