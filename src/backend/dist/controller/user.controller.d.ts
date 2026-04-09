import { Request, Response } from "express";
export declare const signUp: (req: Request, res: Response) => Promise<void>;
export declare const signIn: (req: Request, res: Response) => Promise<void>;
export declare const viewPlans: (req: Request, res: Response) => Promise<void>;
export declare const refreshToken: (req: Request, res: Response) => Promise<void>;
export declare const clearCookie: (req: Request, res: Response) => void;
