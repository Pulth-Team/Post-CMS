import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";

import { User } from "../../models/user";

const router = express.Router();

/**
 * @required
 * Authorization Cookie required
 *
 * Body
 *  @params {String} username
 *  @params {String} email
 *  @params {String} password
 *
 */
router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password must be at least 8 characters at most 20 characters"
      ),
    body("username")
      .notEmpty()
      .withMessage("username must be provided")
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage(
        "username must be at least 4 characters, and max must be at least 50 characters"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new BadRequestError("E-mail or Username is in use");
    }

    const user = User.build({ username, email, password });
    await user.save().catch((err) => {
      console.log(err);
    });
    // Generate JWT
    const userJwt = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
