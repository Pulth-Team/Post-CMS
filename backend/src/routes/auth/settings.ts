import express, { Request, Response } from "express";
import { body, oneOf } from "express-validator";
import jwt from "jsonwebtoken";

import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { validateRequest } from "../../middlewares/validate-request";

import { Password } from "../../services/password";

import { User } from "../../models/user";

import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

/**
 *  Method PUT
 *
 *  @required
 *  Authorization Cookie
 *
 *  Body
 *    @required
 *    @params {String } currentPassword
 *    @params {String | null} username
 *    @params {String | null} email
 *    @params {String | null} newPassword
 *
 *  Response
 *
 */
router.put(
  "/api/auth/settings",
  currentUser,
  requireAuth,
  [
    body("currentPassword")
      .isString()
      .withMessage("must be a string")
      .isLength({ min: 8, max: 20 })
      .withMessage("must be between 8-20 charecters"),
    body("username")
      .optional()
      .isString()
      .withMessage("must be a string")
      .isLength({ min: 4, max: 50 })
      .withMessage("must be between 4-50 charecters"),
    body("email").optional().isEmail().withMessage("must be a email"),
    body("newPassword")
      .optional()
      .isString()
      .withMessage("must be a string")
      .isLength({ min: 8, max: 20 })
      .withMessage("must be between 4-50 charecters"),
    oneOf(
      [
        body("newPassword").exists(),
        body("username").exists(),
        body("email").exists(),
      ],
      "at least one change should be provided"
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, newPassword, currentPassword } = req.body;

    const userDoc = await User.findById(req.currentUser?.id);

    if (!userDoc) throw new NotAuthorizedError();

    let newPasswordHashed;
    if (newPassword) {
      newPasswordHashed = Password.toHash(newPassword);
    }
    if (!(await Password.compare(userDoc.password, currentPassword)))
      throw new BadRequestError("Current Password Mismatch");

    await userDoc.updateOne({
      username,
      email,
      password: newPasswordHashed,
    });

    const userJwt = await jwt.sign(
      {
        id: userDoc.id,
        email: userDoc.email,
        username: userDoc.username,
      },
      process.env.JWT_KEY!,
      { expiresIn: "6h" }
    );

    req.session = {
      jwt: userJwt,
    };

    console.log(req.currentUser, userDoc);

    res.send(userDoc);
  }
);

export { router as settingsRouter };
