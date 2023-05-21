import express from 'express'
import { activate, login, logout, me, register } from '../controllers/AuthController.js'
import { verifyJwt } from '../middleware/verifyJwt.js';

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/activate/:activationCode", activate)

router.get("/me", verifyJwt, me)

router.delete("/logout", verifyJwt, logout)

export default router