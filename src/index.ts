import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routers/index";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

dotenv.config();
const server = express();

server.use(cors());
server.use(json());
server.use(router);
server.use(errorHandlerMiddleware);

const PORT: number = Number(process.env.PORT) || 5009;

server.listen(PORT, () => console.log(`server tried so far in port ${PORT}`));
