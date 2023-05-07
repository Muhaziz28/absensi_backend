import payload from "../response_format.js"
import User from "../models/UserModel.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body
        const emailExist = await User.findOne({ where: { email } })

        if (emailExist) return res.status(400).json({ message: "Email already exist" })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
            username,
            email,
            password: hashedPassword,
            role_id,
        })

        return payload(200, true, "User created", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}