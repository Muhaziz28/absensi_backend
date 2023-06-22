import jwt from "jsonwebtoken"
import Role from "../models/RoleModel.js"
import User from "../models/UserModel.js"
import payload from "../response_format.js"
import dotenv from "dotenv"
dotenv.config();

export const propam = async (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization
        if (!tokenWithBearer) return payload(401, false, "Access denied", null, res)

        const token = tokenWithBearer.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id, {
            include: {
                model: Role,
                attributes: ["id", "role_name"]
            }
        })
        if (!user) return payload(401, false, "Access denied", null, res)

        if (user.role.role_name !== "Propam") return payload(401, false, "Access denied", null, res)
        next()
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}