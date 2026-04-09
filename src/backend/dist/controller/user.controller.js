"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.refreshToken = exports.viewPlans = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("../utils/zod");
const user_model_1 = require("../model/user.model");
const lesson_model_1 = require("../model/lesson.model");
const jwt_1 = require("../utils/jwt");
const getCookieOptions = () => {
    const isProd = process.env.NODE_ENV === "production";
    return { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax", path: "/" };
};
const signUp = async (req, res) => {
    const parsedObject = zod_1.signUpObject.safeParse(req.body);
    if (!parsedObject.success) {
        res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
        return;
    }
    const { email, username, password } = parsedObject.data;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        const findUser = await user_model_1.UserModel.findOne({ email });
        if (findUser) {
            res.status(409).json({ msg: "same email Id exists" });
            return;
        }
        const user = await user_model_1.UserModel.create({ email, username, password: hashedPassword });
        const accessToken = (0, jwt_1.generateAccessToken)(user._id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id);
        res.status(200).cookie("accessToken", accessToken, getCookieOptions()).cookie("refreshToken", refreshToken, getCookieOptions()).json({ msg: "user created successfully", username: user.username });
    }
    catch (error) {
        res.status(500).json({ msg: `something went wrong while creating user error : ${error}` });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const parsedObject = zod_1.signInObject.safeParse(req.body);
    if (!parsedObject.success) {
        res.status(403).json({ msg: "invalid credentials", error: parsedObject.error.errors });
        return;
    }
    const { email, password } = parsedObject.data;
    try {
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "incorrect password or email" });
            return;
        }
        const comparedPassword = await bcrypt_1.default.compare(password, user.password);
        if (!comparedPassword) {
            res.status(400).json({ msg: "incorrect password or email" });
            return;
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user._id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id);
        res.status(200).cookie("accessToken", accessToken, getCookieOptions()).cookie("refreshToken", refreshToken, getCookieOptions()).json({ msg: "user logged in Successfully", username: user.username });
    }
    catch (error) {
        res.status(500).json({ msg: `something went wrong while signin ; error : ${error.message}` });
    }
};
exports.signIn = signIn;
const viewPlans = async (req, res) => {
    const userId = req.userId;
    try {
        const response = await lesson_model_1.LessonPlanModel.find({ creatorId: userId });
        res.status(200).json({ msg: "lesson plan fetched successfully", lessonPlans: response });
    }
    catch (error) {
        res.status(500).json({ msg: `error while fetching the data, ${error.message}` });
    }
};
exports.viewPlans = viewPlans;
const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        res.status(401).json({ msg: "No refresh token" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = (0, jwt_1.generateAccessToken)(decoded.userId);
        res.cookie("accessToken", accessToken, getCookieOptions());
        res.status(200).json({ msg: "Token refreshed" });
    }
    catch (error) {
        res.status(403).json({ msg: "Invalid refresh token" });
    }
};
exports.refreshToken = refreshToken;
const clearCookie = (req, res) => {
    const isProd = process.env.NODE_ENV === "production";
    const options = { path: "/", httpOnly: true, secure: isProd };
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    res.status(200).json({ msg: "User logged Out" });
};
exports.clearCookie = clearCookie;
