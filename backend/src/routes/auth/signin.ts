import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";

import { User } from "../../models/user";
import { Password } from "../../services/password";

const router = express.Router();

router.post("/api/auth/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) throw new BadRequestError("Invalid Credentials");

  const passwordMatch = await Password.compare(existingUser.password, password);

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
});

export { router as signinRouter };
