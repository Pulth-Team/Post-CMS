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
 *    @status 200
 *    @body {Object}
 *      {
 *        username: String,
 *        email: String,
 *        id: String,
 *      }
 *    @cookie Authorization Cookie
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
      .isLength({ min: 8, max: 50 })
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
    // Get user Informations from the request
    const { username, email, newPassword, currentPassword } = req.body;

    // Find user by id
    const userDoc = await User.findById(req.currentUser?.id);

    // Check if user exists
    if (!userDoc) throw new NotAuthorizedError();

    // Check if current password is correct
    if (!(await Password.compare(userDoc.password, currentPassword)))
      throw new BadRequestError("Current Password Mismatch");

    // Update user informations if provided
    if (username) userDoc.username = username;
    if (email) userDoc.email = email;
    if (newPassword) userDoc.password = newPassword;

    // Save user informations
    await userDoc.save();

    // Generate JWT
    const userJwt = await jwt.sign(
      {
        id: userDoc.id,
        email: userDoc.email,
        username: userDoc.username,
      },
      process.env.JWT_KEY!,
      { expiresIn: "6h" }
    );

    // set Cookie with JWT
    req.session = {
      jwt: userJwt,
    };

    // Send new user informations as response
    res.send(userDoc);
  }
);

export { router as settingsRouter };
