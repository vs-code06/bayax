"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const docx_1 = require("docx");
const createPara = (text, bold = false, underline = false) => {
    return new docx_1.Paragraph({
        children: [
            new docx_1.TextRun({
                text: text,
                bold: bold,
                underline: underline ? {} : undefined,
            }),
        ],
        spacing: { after: 200 },
    });
};
const createRow = (cells) => {
    return new docx_1.TableRow({
        children: cells.map((cellText) => new docx_1.TableCell({
            children: [new docx_1.Paragraph({ text: cellText || " " })],
            width: { size: 100 / cells.length, type: docx_1.WidthType.PERCENTAGE },
            borders: {
                top: { style: docx_1.BorderStyle.SINGLE, size: 1, color: "000000" },
                bottom: { style: docx_1.BorderStyle.SINGLE, size: 1, color: "000000" },
                left: { style: docx_1.BorderStyle.SINGLE, size: 1, color: "000000" },
                right: { style: docx_1.BorderStyle.SINGLE, size: 1, color: "000000" },
            },
        })),
    });
};
const createDocument = async (input) => {
    const { subject, topic, grade, duration, overviewText, curricularText, factualsText, conceptualText, proceduralText, essentialQuestionText, teachingPointText, sequentialActivityText, formativeAssesmentText, gptQuestionText, summarizationhomeText } = input;
    const doc = new docx_1.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx_1.Paragraph({ text: "LESSON PLAN", heading: "Heading1", alignment: "center", spacing: { after: 300 } }),
                    new docx_1.Table({
                        rows: [
                            createRow(["Lesson Plan no: ", " "]),
                            createRow(["Date: ", " ", `Subject: ${subject}`]),
                            createRow([`Class: ${grade}`, " ", `Topic: ${topic}`]),
                            createRow([`Time: ${duration}`, " ", "Period: "]),
                        ],
                        width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
                    }),
                    new docx_1.Paragraph({ text: "" }),
                    createPara("Overview and Learning Objective", true, true),
                    createPara(overviewText || " "),
                    createPara("Curricular Goals and Curricular competencies", true, true),
                    createPara(curricularText || " "),
                    new docx_1.Paragraph({ text: "" }),
                    new docx_1.Table({
                        rows: [
                            createRow(["Learning Objective", "Curricular competencies", "FACTUAL KNOWLEDGE", "CONCEPTUAL KNOWLEDGE", "PROCEDURAL KNOWLEDGE"]),
                            createRow(["LO-1", "CC-1", factualsText || " ", conceptualText || " ", proceduralText || " "]),
                        ],
                        width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
                    }),
                    new docx_1.Paragraph({ text: "" }),
                    createPara("Essential question", true, true),
                    createPara(essentialQuestionText || " "),
                    new docx_1.Paragraph({ text: "" }),
                    new docx_1.Table({
                        rows: [
                            createRow(["Teaching Points", "Learning Outcomes", "Sequential Learning Activities", "Formative Assessment", "Expected Queries"]),
                            createRow([teachingPointText || " ", "LO1, LO2", sequentialActivityText || " ", formativeAssesmentText || " ", gptQuestionText || " "]),
                        ],
                        width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
                    }),
                    new docx_1.Paragraph({ text: "" }),
                    createPara("Summarization And Home work :", true, true),
                    createPara(summarizationhomeText || " "),
                    new docx_1.Paragraph({ text: "" }),
                    createPara("Signature of Teacher ", true, true),
                ],
            },
        ],
    });
    const dirPath = path_1.default.join(__dirname, "..", "LessonPlansTemp");
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path_1.default.join(dirPath, `${topic}.docx`);
    const buffer = await docx_1.Packer.toBuffer(doc);
    fs_1.default.writeFileSync(filePath, buffer);
    return filePath;
};
exports.createDocument = createDocument;
