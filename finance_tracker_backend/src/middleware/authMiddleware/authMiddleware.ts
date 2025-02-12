import { Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export interface AuthRequest extends Request {
    user?: any; 
}
export const authMiddleware = (req: AuthRequest , res: Response, next: NextFunction) => {

    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) {

        res.status(401).json({message: "No token , authorization denied"});
        
    }

    try {
        const decoded = jwt.verify( token as string , JWT_SECRET) as any;
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }

}