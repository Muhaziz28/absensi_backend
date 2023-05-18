import payload from "../response_format.js"
import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import AccessToken from "../models/AccessTokenModel.js";
import ip from "ip"
import Role from "../models/RoleModel.js";
import sendMail from "../helper/sendMail.js";

dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, email, password, satuan_kerja_id } = req.body
        const emailExist = await User.findOne({ where: { email } })

        if (emailExist) return payload(400, false, "Email already exists", null, res)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
            username,
            email,
            password: hashedPassword,
            role_id: 3,
            satuan_kerja_id,
        })

        const activationCode = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        const activationLink = `http://localhost:4000/activate/` + activationCode
        const emailText = `
                <h1>Account Activation</h1>
                <p>Hi ${username},</p>
                <p>Thank you for registering</p>
                <p>Click link below to activate your account</p>
                <a href="${activationLink}">${activationLink}</a>`

        sendMail(email, emailText)

        return payload(200, true, "Register success, please check your email to activate your account", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return payload(400, false, "Please fill all fields", null, res)

        let user
        if (username.includes("@")) {
            user = await User.findOne({ where: { email: username } })
        } else {
            user = await User.findOne({ where: { username } })
        }
        if (!user) return payload(400, false, "Username or email not found", null, res)

        if (user.is_active === false) return payload(400, false, "Your account is not active", null, res)

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return payload(400, false, "Invalid password", null, res)

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        await AccessToken.create({
            user_id: user.id,
            access_token: token,
            ip_address: ip.address()
        })
        const currUser = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ["password", "role_id", "createdAt", "updatedAt"],
            },
            include: {
                model: Role,
                attributes: ["id", "role_name"]
            }
        })
        return payload(200, true, "Login success", { token, user: currUser }, res)
    } catch (e) {
        return payload(500, false, e.message, null, res)
    }
}

export const activate = async (req, res) => {
    try {
        const { activationCode } = req.params
        const { email } = jwt.verify(activationCode, process.env.JWT_SECRET)
        await User.update({
            is_active: true
        }, {
            where: { email }
        })
        return payload(200, true, "Account activated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const me = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findOne({
            where: { id },
            attributes: {
                exclude: ["password", "role_id", "createdAt", "updatedAt"],
            },
            include: {
                model: Role,
                attributes: ["id", "role_name"]
            }
        })

        return payload(200, true, "User data", user, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}