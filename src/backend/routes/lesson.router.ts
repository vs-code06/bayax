import { Router } from "express";
import { createPlan, viewAllPlans } from "../controller/lesson.controller";
import { auth } from "../middlewares/auth";

const lessonRouter = Router();

lessonRouter.post("/createPlan", auth, createPlan);
lessonRouter.get("/viewAllLessonPlans", auth, viewAllPlans);

export { lessonRouter };
