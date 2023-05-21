import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { absenMasuk, absenPulang, getCurrentHistoryAbsen, getCurrentHistoryAbsenToday } from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/history-absensi", verifyJwt, getCurrentHistoryAbsen)
router.get("/history-absensi-today", verifyJwt, getCurrentHistoryAbsenToday)
router.post("/absen-masuk", verifyJwt, absenMasuk)
router.post("/absen-pulang", verifyJwt, absenPulang)

export default router