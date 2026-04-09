import mongoose, { Document } from "mongoose";
export interface ILessonPlan extends Document {
    subject: string;
    topic: string;
    grade: string;
    duration: number;
    creatorId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const LessonPlanModel: mongoose.Model<ILessonPlan, {}, {}, {}, mongoose.Document<unknown, {}, ILessonPlan> & ILessonPlan & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
