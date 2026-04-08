import path from "path";
import fs from "fs";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType } from "docx";

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

const createPara = (text: string, bold: boolean = false, underline: boolean = false): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: bold,
        underline: underline ? {} : undefined,
      }),
    ],
    spacing: { after: 200 },
  });
};

const createRow = (cells: string[]): TableRow => {
  return new TableRow({
    children: cells.map(
      (cellText) =>
        new TableCell({
          children: [new Paragraph({ text: cellText || " " })],
          width: { size: 100 / cells.length, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          },
        })
    ),
  });
};

export const createDocument = async (input: DocumentInput): Promise<string> => {
  const { subject, topic, grade, duration, overviewText, curricularText, factualsText, conceptualText, proceduralText, essentialQuestionText, teachingPointText, sequentialActivityText, formativeAssesmentText, gptQuestionText, summarizationhomeText } = input;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: "LESSON PLAN", heading: "Heading1", alignment: "center", spacing: { after: 300 } }),
          new Table({
            rows: [
              createRow(["Lesson Plan no: ", " "]),
              createRow(["Date: ", " ", `Subject: ${subject}`]),
              createRow([`Class: ${grade}`, " ", `Topic: ${topic}`]),
              createRow([`Time: ${duration}`, " ", "Period: "]),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: "" }),
          createPara("Overview and Learning Objective", true, true),
          createPara(overviewText || " "),
          createPara("Curricular Goals and Curricular competencies", true, true),
          createPara(curricularText || " "),
          new Paragraph({ text: "" }),
          new Table({
            rows: [
              createRow(["Learning Objective", "Curricular competencies", "FACTUAL KNOWLEDGE", "CONCEPTUAL KNOWLEDGE", "PROCEDURAL KNOWLEDGE"]),
              createRow(["LO-1", "CC-1", factualsText || " ", conceptualText || " ", proceduralText || " "]),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: "" }),
          createPara("Essential question", true, true),
          createPara(essentialQuestionText || " "),
          new Paragraph({ text: "" }),
          new Table({
            rows: [
              createRow(["Teaching Points", "Learning Outcomes", "Sequential Learning Activities", "Formative Assessment", "Expected Queries"]),
              createRow([teachingPointText || " ", "LO1, LO2", sequentialActivityText || " ", formativeAssesmentText || " ", gptQuestionText || " "]),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: "" }),
          createPara("Summarization And Home work :", true, true),
          createPara(summarizationhomeText || " "),
          new Paragraph({ text: "" }),
          createPara("Signature of Teacher ", true, true),
        ],
      },
    ],
  });

  const dirPath = path.join(__dirname, "..", "LessonPlansTemp");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, `${topic}.docx`);

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
