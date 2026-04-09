"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonPlanPrompt = void 0;
const lessonPlanPrompt = ({ subject, topic, grade, duration }) => {
    return `
    Create a comprehensive lesson plan for a ${duration}-minute class on "${topic}" for Grade ${grade} students in the subject of ${subject}.

    Format the output as a valid JSON object with the following structure (do not include markdown code blocks, just the raw JSON):

    {
      "overview": "Brief introduction (max 30 words)",
      "learningOBJS": ["LO-1", "LO-2", "LO-3"],
      "curricularGoals": ["CG-1", "CG-2"],
      "curricularCompetencies": ["CC-1", "CC-2", "CC-3"],
      "factualKnowledge": ["Point 1", "Point 2", "Point 3"],
      "conceptualKnowledge": ["Point 1", "Point 2", "Point 3"],
      "proceduralKnowledge": ["Point 1", "Point 2", "Point 3"],
      "essentialQuestions": ["Q1", "Q2", "Q3"],
      "teachingPoints": ["TP1", "TP2", "TP3"],
      "sequentialActivities": ["Activity 1", "Activity 2", "Activity 3"],
      "formativeAssessments": ["Assessment 1", "Assessment 2", "Assessment 3"],
      "gptQuestions": ["Q1", "Q2", "Q3"],
      "summarization": "Short summary (max 20 words)",
      "homework": ["A1", "A2", "A3"]
    }

    Ensure all content is educational, accurate, and age-appropriate. Keep descriptions concise as per previous word limits.
  `;
};
exports.lessonPlanPrompt = lessonPlanPrompt;
