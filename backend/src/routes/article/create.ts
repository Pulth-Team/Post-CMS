import express, { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";

import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

import { Article } from "../../models/article";

const router = express.Router();

/**
 *
 *  @required
 *  Authorization Cookie required
 *  Body
 *    @params {Number} time
 *    @params {Number} version
 *    @params {ArticleBlock[]} blocks
 */
router.post(
  "/api/article/create",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    console.log(req.body);
    const article = Article.build({
      userId: new mongoose.Types.ObjectId(req.currentUser!.id),
      time: req.body.time,
      version: req.body.version,
      blocks: req.body.blocks,
    });
    article.save();
    res.send(req.currentUser);
  }
);

export { router as articleCreateRouter };
