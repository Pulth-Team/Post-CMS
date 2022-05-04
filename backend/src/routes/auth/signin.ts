import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";

import { User } from "../../models/user";
import { Password } from "../../services/password";

const router = express.Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password to sign in")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password must be at least 8 characters at most 20 characters"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new BadRequestError("Invalid Credentials");

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) throw new BadRequestError("Invalid Credentials");

    const userJwt = await jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
