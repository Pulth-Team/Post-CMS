import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose, { ObjectId } from "mongoose";
import aws from "aws-sdk";
import multer from "multer";

import { validateRequest } from "../../middlewares/validate-request";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import makeId from "../../services/make-id";
import { BadRequestError } from "../../errors/bad-request-error";

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
 *    @params {}
 *
 */
router.post(
  "/api/article/uploadImage",
  currentUser,
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response) => {
    //TODO: validate request
    //TODO: make sure file is an image, proper size, type and provided

    if (!req.file) throw new BadRequestError("No file provided");

    const s3 = new aws.S3();
    const { mimetype } = req.file!;
    console.log(mimetype);

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
      // ownerId:req.currentUser?.id
    };

    res.send(responseData);
  }
);

export { router as articleUploadImageRouter };
