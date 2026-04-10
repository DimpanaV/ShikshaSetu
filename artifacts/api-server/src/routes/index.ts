import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import { lessonsRouter } from "./lessons.js";
import { quizRouter } from "./quiz.js";
import { mentorRouter } from "./mentor.js";
import { progressRouter } from "./progress.js";
import { dashboardRouter } from "./dashboard.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/lessons", lessonsRouter);
router.use("/quiz", quizRouter);
router.use("/mentor", mentorRouter);
router.use("/progress", progressRouter);
router.use("/dashboard", dashboardRouter);

export default router;
