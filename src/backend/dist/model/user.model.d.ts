import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
