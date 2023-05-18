import express from "express"
import { createSuku, getAllSuku } from "../controllers/SukuController.js"
import { verifyJwt } from "../middleware/verifyJwt.js"

const router = express.Router()

router.get("/suku", verifyJwt, getAllSuku)
router.post("/suku", verifyJwt, createSuku)

export default router