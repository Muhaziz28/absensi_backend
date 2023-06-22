import express from "express"
import { createSuku, deleteSuku, getAllSuku, updateSuku } from "../controllers/SukuController.js"
import { verifyJwt } from "../middleware/verifyJwt.js"
import { superadmin } from "../middleware/superadmin.js"

const router = express.Router()

router.get("/suku", getAllSuku)
router.post("/suku", verifyJwt, superadmin, createSuku)
router.put("/suku/:id", verifyJwt, superadmin, updateSuku)
router.delete("/suku/:id", verifyJwt, superadmin, deleteSuku)

export default router
