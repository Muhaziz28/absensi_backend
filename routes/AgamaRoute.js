import express from "express"
import { createAgama, deleteAgama, getAllAgama, updateAgama } from '../controllers/AgamaController.js'
import { verifyJwt } from "../middleware/verifyJwt.js"
import { superadmin } from "../middleware/superadmin.js"
const router = express.Router()

router.get("/agama", getAllAgama)
router.post("/agama", verifyJwt, superadmin, createAgama)
router.put("/agama/:id", verifyJwt, superadmin, updateAgama)
router.delete("/agama/:id", verifyJwt, superadmin, deleteAgama)

export default router