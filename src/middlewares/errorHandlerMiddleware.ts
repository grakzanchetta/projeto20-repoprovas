import { NextFunction, Request, Response } from "express";

export default async function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "conflict") return res.status(409).send(error.message);
  if (error.type === "unauthorized") return res.status(401).send(error.message);
  if (error.type === "not_found") return res.status(404).send(error.message);
  if (error.type === "bad_request") return res.status(400).send(error.message);
  res.status(500);
}
