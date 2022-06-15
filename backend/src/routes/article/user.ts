import express, { Request, Response } from "express";
import { query, param } from "express-validator";

import { validateRequest } from "../../middlewares/validate-request";

import { Article } from "../../models/article";

const router = express.Router();

/**
 *    @required
 *      {ObjectId} UserId
 *    @params {Number} skip
 *    @params {Number} limit
 */

router.get(
  "/api/article/user/:userId",
  [
    param("userId").isMongoId().withMessage("UserId must be type of ObjectId"),
    query("skip")
      .if(query("skip").exists())
      .isNumeric()
      .withMessage("Skip value must be numeric"),
    query("limit")
      .if(query("limit").exists())
      .isNumeric()
      .withMessage("Limit value must be numeric"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const reqSkip = req.query.skip;
    const reqLimit = req.query.limit;

    const articles = await Article.find({ userId })
      .limit(+reqLimit! || 20)
      .skip(+reqSkip! || 0);
    res.send(articles);
  }
);

export { router as articleUserRouter };
