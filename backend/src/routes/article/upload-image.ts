import express, { Request, Response } from "express";
import aws from "aws-sdk";
import multer from "multer";
import mongoose from "mongoose";

import makeId from "../../services/make-id";

import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

import { Image } from "../../models/image";

import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { body } from "express-validator";

const router = express.Router();
const upload = multer({});

/**
 *  @api {post} /api/article/upload-image
 *    Uploading image to account-id
 *
 *  @required
 *  Authorization Cookie
 *
 *  Body
 *    @params {File} image
 *    @params {ObjectId} articleId
 *
 */
router.post(
  "/api/article/uploadImage",
  [
    body("articleId")
      .notEmpty()
      .withMessage("articleId must be provided")
      .isMongoId()
      .withMessage("articleId must be ObjectId"),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response) => {
    //TODO: make sure file is an image, proper size, type and provided

    if (!req.file) throw new BadRequestError("No file provided");

    const s3 = new aws.S3();
    const { mimetype } = req.file!;
    const { articleId } = req.body;

    const s3UploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: Date.now() + "-" + makeId(4),
      Body: req.file!.buffer,
      ACL: "public-read",
    };

    const uploadedImage = await s3.upload(s3UploadParams).promise();
    console.log(uploadedImage);
    const responseData = {
      imageUrl: "https://cdn.pulth.com/" + uploadedImage.Key,
      fileType: mimetype,
      imageName: uploadedImage.Key,
      ownerId: req.currentUser?.id,
    };
    const imageDoc = await Image.build({
      Key: uploadedImage.Key,
      fileType: mimetype,
      ownerId: new mongoose.Types.ObjectId(req.currentUser!.id),
      articleId: new mongoose.Types.ObjectId(articleId),
    }).save();

    console.log(imageDoc);

    res.send(responseData);
  }
);

export { router as articleUploadImageRouter };
