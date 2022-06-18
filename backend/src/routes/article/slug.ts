import express, { Request, Response } from "express";
import { param } from "express-validator";

import { validateRequest } from "../../middlewares/validate-request";
import { Article } from "../../models/article";

import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

/**
 *
 *  URL Params
 *    @params {String} slug
 *
 */
router.get(
  "/api/article/:slug",
  [param("slug").isSlug().withMessage("Article name must be slug")],
  validateRequest,
  async (req: Request, res: Response) => {
    const slug = req.params.slug;

    const article = await Article.findOne({ slug });
    if (article) {
      res.send(article);
    } else {
      throw new NotFoundError();
    }
  }
);

export { router as articleSlugRouter };
