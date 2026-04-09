interface DocumentInput {
    subject: string;
    topic: string;
    grade: string;
    duration: number;
    overviewText: string;
    curricularText: string;
    factualsText: string;
    conceptualText: string;
    proceduralText: string;
    essentialQuestionText: string;
    teachingPointText: string;
    sequentialActivityText: string;
    formativeAssesmentText: string;
    gptQuestionText: string;
    summarizationhomeText: string;
}
export declare const createDocument: (input: DocumentInput) => Promise<string>;
export {};
