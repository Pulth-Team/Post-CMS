import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";

const router = express.Router();

router.get("/api/auth/check", currentUser, (req: Request, res: Response) => {
  res.send(req.currentUser ? true : false);
});

export { router as checkUserRouter };
