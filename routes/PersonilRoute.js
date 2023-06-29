import express from "express"
import { verifyJwt } from "../middleware/verifyJwt.js"
import { createPersonil, getAllPersonil } from "../controllers/PersonilController.js"

const router = express.Router()

router.get('/get-all-personil', verifyJwt, getAllPersonil)
router.post('/create-personil', verifyJwt, createPersonil)

export default router