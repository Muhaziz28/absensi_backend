import express from "express"
import { verifyJwt } from "../middleware/verifyJwt.js"
import { getMyTunjangan } from "../controllers/TunjanganController.js"

const router = express.Router()

router.get("/tunjangan", verifyJwt, getMyTunjangan)

export default router