"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaRouter = void 0;
const express_1 = require("express");
const idea_controller_1 = require("../controller/idea.controller");
const ideaRouter = (0, express_1.Router)();
exports.ideaRouter = ideaRouter;
ideaRouter.post("/analyze", idea_controller_1.analyzeIdea);
