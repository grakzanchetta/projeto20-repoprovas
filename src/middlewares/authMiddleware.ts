import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const secretKey = process.env.JWT_KEY;
  if (secretKey === undefined || token === undefined) {
    throw {
      type: "not_found",
      message: "either key or token hasn't been found",
    };
  }

  const user = jwt.verify(token, secretKey, function (err) {
    if (err) {
      throw {
        type: "not_found",
        message: "Token not found",
      };
    }
  });

  res.locals.user = user;
  next();
}
