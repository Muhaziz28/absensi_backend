import express from 'express'
import { activate, login, me, register } from '../controllers/AuthController.js'
import { verifyJwt } from '../middleware/verifyJwt.js';

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/activate/:activationCode", activate)

router.get("/me", verifyJwt, me)

export default router