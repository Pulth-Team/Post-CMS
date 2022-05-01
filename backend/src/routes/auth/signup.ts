import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";

import { User } from "../../models/user";

const router = express.Router();

router.post("/api/auth/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("E-mail in use");
  }

  const user = User.build({ email, password });
  await user.save();
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
});

export { router as signupRouter };
