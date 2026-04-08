import { Router } from "express";
import { analyzeIdea } from "../controller/idea.controller";

const ideaRouter = Router();

ideaRouter.post("/analyze", analyzeIdea);

export { ideaRouter };
