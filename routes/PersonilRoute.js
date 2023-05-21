import express from "express"
import { verifyJwt } from "../middleware/verifyJwt.js"
import { getAllPersonil } from "../controllers/PersonilController.js"

const router = express.Router()

router.get('/get-all-personil', verifyJwt, getAllPersonil)

export default router