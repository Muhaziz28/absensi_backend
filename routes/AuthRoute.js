import express from 'express'
import {activate, login, register} from '../controllers/AuthController.js'

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/activate/:activationCode", activate);

export default router