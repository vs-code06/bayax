import { Router } from "express";
import { auth } from "../middlewares/auth";
import { signUp, signIn, viewPlans, refreshToken, clearCookie } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/refreshToken", refreshToken);
userRouter.get("/viewPlan", auth, viewPlans);
userRouter.get("/api/logOut", auth, clearCookie);

export { userRouter };
