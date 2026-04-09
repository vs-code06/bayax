"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeIdea = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
const analyzeIdea = async (req, res) => {
    try {
        const { field, intent, content, techStack } = req.body;
        let promptContext = "";
        if (intent === "need_idea") {
            promptContext = `
        USER SCENARIO: The user wants to build something in the "${field}" field but DOES NOT have a specific idea.
        USER CONSTRAINTS: "${content || "None provided"}"
        PREFERRED TECH: "${techStack || "Any"}"
        TASK: Generate a highly viable, modern startup idea for this user in the ${field} space.
        Then analyze that generated idea as if it was their own.
      `;
        }
        else {
            promptContext = `
        USER SCENARIO: The user has a specific idea in the "${field}" field.
        IDEA DESCRIPTION: "${content}"
        PREFERRED TECH: "${techStack || "Best suited for the project"}"
        TASK: Analyze this specific idea. Enhance it, structure it, and validate it.
      `;
        }
        const systemPrompt = `
      You are BayaX, the world's most advanced Product Architect AI.
      Your goal is to transform separate inputs into a complete EXECUTION BLUEPRINT.

      OUTPUT FORMAT:
      Return strictly a valid JSON object. Do not include markdown formatting.

      JSON STRUCTURE:
      {
        "clarityCheck": {
           "originalInput": "String",
           "refinedConcept": "String",
           "category": "String"
        },
        "marketAnalysis": {
           "score": 0,
           "verdict": "String",
           "competitors": ["String"],
           "targetAudience": ["String"],
           "monetization": ["String"]
        },
        "techStack": {
             "frontend": "String",
             "backend": "String",
             "database": "String",
             "deployment": "String",
             "rationale": "String"
        },
        "mindMap": {
            "root": "String",
            "branches": [
                { "label": "String", "children": ["String"] }
            ]
        },
        "executionStructure": {
           "phases": [
              { "name": "Phase 1: MVP", "steps": ["Step 1", "Step 2"] }
           ]
        },
        "logicFlow": {
            "topic": "String",
            "problem": "String",
            "solution": "String",
            "marketEffects": {
                "positive": "String",
                "negative": "String"
            }
        },
        "criticalQuestions": ["String"]
      }

      CONTEXT:
      ${promptContext}
    `;
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const responseText = response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("AI failed to return a valid JSON structure.");
        }
        const jsonResponse = JSON.parse(jsonMatch[0]);
        res.status(200).json({ success: true, data: jsonResponse });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || "AI Analysis Failed", error: error.message });
    }
};
exports.analyzeIdea = analyzeIdea;
