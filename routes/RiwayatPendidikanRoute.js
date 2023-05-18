import express from "express"
import { createRiwayatPendidikan, deleteRiwayatPendidikan, getMyRiwayatPendidikan, updateRiwayatPendidikan } from "../controllers/RiwayatPendidikanController.js"
import { verifyJwt } from "../middleware/verifyJwt.js"

const router = express.Router()

router.get("/riwayat-pendidikan", verifyJwt, getMyRiwayatPendidikan)
router.post("/riwayat-pendidikan", verifyJwt, createRiwayatPendidikan)
router.put("/riwayat-pendidikan/:id", verifyJwt, updateRiwayatPendidikan)
router.delete("/riwayat-pendidikan/:id", verifyJwt, deleteRiwayatPendidikan)

export default router
