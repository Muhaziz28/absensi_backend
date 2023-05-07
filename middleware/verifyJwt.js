import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import payload from "../response_format.js";
dotenv.config();

export const verifyJwt = (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization
        if(!tokenWithBearer) return payload (401, false, "Access denied", null, res)

        const token = tokenWithBearer.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return payload(401, false, "Invalid token", null, res)
            req.user = decoded
            next()
        })
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}