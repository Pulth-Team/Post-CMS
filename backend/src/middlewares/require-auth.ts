import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

interface UserPayload {
  id: string;
  email: string;
  iat: number;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.jwt) {
    try {
      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;

      req.currentUser = payload;
      next();
    } catch (err) {
      throw new NotAuthorizedError();
    }
  } else {
    throw new NotAuthorizedError();
  }
};
