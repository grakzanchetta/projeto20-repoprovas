import { Router } from "express";
import assignmentsRouter from "./assignmentsRouter";
import usersRouter from "./usersRouter";

const router = Router();

router.use(usersRouter);
router.use(assignmentsRouter);

export default router;
