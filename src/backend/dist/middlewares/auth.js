"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if (!accessToken && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            accessToken = authHeader.substring(7, authHeader.length);
        }
    }
    if (!accessToken) {
        res.status(403).json({ msg: "no access token provided" });
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        const status = error.message.includes("expired") ? 401 : 403;
        res.status(status).json({ msg: `Unable to verify the token error : ${error.message}` });
    }
};
exports.auth = auth;
