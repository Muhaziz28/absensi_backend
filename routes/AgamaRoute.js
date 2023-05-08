import express from "express"
import { createAgama, deleteAgama, getAllAgama, updateAgama } from '../controllers/AgamaController.js'

const router = express.Router()

router.get("/agama", getAllAgama)
router.post("/agama", createAgama)
router.put("/agama/:id", updateAgama)
router.delete("/agama/:id", deleteAgama)

export default router