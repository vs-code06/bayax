interface LessonPromptInput {
    subject: string;
    topic: string;
    grade: number;
    duration: number;
}
export declare const lessonPlanPrompt: ({ subject, topic, grade, duration }: LessonPromptInput) => string;
export {};
