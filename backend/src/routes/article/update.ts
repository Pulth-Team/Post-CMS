import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import slugify from "slugify";

import { validateRequest } from "../../middlewares/validate-request";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

import { Article } from "../../models/article";
import { NotFoundError } from "../../errors/not-found-error";

import makeId from "../../services/make-id";
import { NotAuthorizedError } from "../../errors/not-authorized-error";

const router = express.Router();

/**
 *  Method: PUT
 *  Path: /api/article/update
 *
 *  @required
 *  Authorization Cookie required
 *
 *  Body
 *    @required
 *    @params {String} slug
 *    @params {Number | null} version
 *    @params {ArticleBlock[] | null} blocks
 *    @params {String | null} title
 *
 */
router.put(
  "/api/article/update",
  [
    body("slug").isSlug().withMessage("Slug must be a valid slug"),
    body("version")
      .optional()
      .notEmpty()
      .withMessage("Version must be provided")
      .isString()
      .withMessage("Version must be a string"),
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isLength({ min: 5, max: 50 })
      .withMessage("Title must be between 5 and 50 characters"),
    body("blocks")
      .optional()
      .notEmpty()
      .withMessage("Blocks must be provided")
      .isArray({ min: 1, max: 100 })
      .withMessage("Blocks must be between 1 to 100 elements"),
    body("blocks.*.id")
      .notEmpty()
      .withMessage("Block must provide id property"),
    body("blocks.*.type")
      .notEmpty()
      .withMessage("Block must provide type property")
      .isString()
      .withMessage("Type must be a string"),
    body("blocks.*.data")
      .notEmpty()
      .withMessage("Block must have data property")
      .isObject()
      .withMessage("Data property must be an object"),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    //TODO check is there any change in the article (in the validation section)

    const { slug, version, title, blocks } = req.body;

    const article = await Article.findOne({ slug });

    if (article?.userId !== req.currentUser?.id) throw new NotAuthorizedError();
    if (!article) throw new NotFoundError();

    if (version) article.version = version;
    if (blocks) article.blocks = blocks;

    if (title) {
      let slug = slugify(title, {
        lower: true,
        strict: true,
      });
      slug += "-" + makeId(4);

      article.title = title;
      article.slug = slug;
    }

    await article.save();

    res.status(200).send(article);
  }
);

export { router as articleUpdateRouter };
