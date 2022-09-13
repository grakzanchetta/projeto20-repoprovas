import { Request, Response } from "express";

async function helloThere(req: Request, res: Response) {
  res.status(201).send("Hello There, General Kenobi");
}

export { helloThere };
