import { Request, Response, NextFunction } from "express";
import { JWTService } from "../services/JWTService";

export class AuthMiddleware {
  private readonly jwtService: JWTService;

  constructor() {
    this.jwtService = new JWTService();
  }

  public verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    let accessToken = req.cookies.accessToken;

    if (!accessToken && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        accessToken = authHeader.substring(7, authHeader.length);
      }
    }

    if (!accessToken) {
      res.status(403).json({ msg: "no access token provided" });
      return;
    }

    try {
      const decodedToken = this.jwtService.verifyAccessToken(accessToken);
      (req as any).userId = decodedToken.userId;
      next();
    } catch (error: any) {
      const status = error.message?.includes("expired") ? 401 : 403;
      res.status(status).json({ msg: `Unable to verify the token error : ${error.message}` });
    }
  };
}

export const auth = new AuthMiddleware().verifyToken;
