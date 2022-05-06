import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Article } from "../../models/article";

const router = express.Router();

/**
 *    @required
 *      {ObjectId} UserId
 *    @params {Number} skip
 *    @params {Number} limit
 */

router.get("/api/article/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const reqSkip = req.query.skip;
  const reqLimit = req.query.limit;

  const articles = await Article.find({ userId })
    .limit(+reqLimit! || 0)
    .skip(+reqSkip! || 0);
  res.send(articles);
});

export { router as articleUserRouter };
