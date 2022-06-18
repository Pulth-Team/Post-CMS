import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose, { ObjectId } from "mongoose";
import slugify from "slugify";

import { validateRequest } from "../../middlewares/validate-request";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

import { Article } from "../../models/article";

const router = express.Router();

//Make id for unique slug
function makeid(length: Number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 *
 *  @required
 *  Authorization Cookie
 *
 *  Body
 *    @params {Number} version
 *    @params {ArticleBlock[]} blocks
 *    @params {String} title
 *
 */
router.post(
  "/api/article/create",
  [
    body("title")
      .notEmpty()
      .withMessage("Title must be provided")
      .isString()
      .withMessage("Title must be a string")
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage("Title can be up to 50 characters"),
    body("version")
      .notEmpty()
      .withMessage("Version must be provided")
      .isString()
      .withMessage("Version must be a version string"),
    body("blocks")
      .notEmpty()
      .withMessage("Blocks must be provided")
      .isArray({ min: 1, max: 100 })
      .withMessage("Artivle blocks must be between 1 to 100 elements"),
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
  (req: Request, res: Response) => {
    let slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    slug += "-" + makeid(4);

    const article = Article.build({
      userId: new mongoose.Types.ObjectId(req.currentUser!.id),
      title: req.body.title,
      slug: slug,
      version: req.body.version,
      blocks: req.body.blocks,
    });
    article.save();
    res.send({
      userId: req.currentUser!.id,
      title: req.body.title,
      slug,
    });
  }
);

export { router as articleCreateRouter };
