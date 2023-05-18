import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { absenMasuk, absenPulang, getCurrentHistoryAbsen } from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/history-absensi", verifyJwt, getCurrentHistoryAbsen)

router.post("/absen-masuk", verifyJwt, absenMasuk)
router.post("/absen-pulang", verifyJwt, absenPulang)

export default router