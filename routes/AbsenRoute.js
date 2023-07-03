import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { absenMasuk, absenPulang, getAllAbsensiPersonilToday, getCurrentHistoryAbsen, getCurrentHistoryAbsenPerUser, getCurrentHistoryAbsenToday, rekapAbsensi, tindakDisiplin } from "../controllers/AbsenController.js";
import { superadmin } from "../middleware/superadmin.js";
const router = express.Router();

router.get("/history-absensi", verifyJwt, getCurrentHistoryAbsen)
router.get("/history-absensi-today", verifyJwt, getCurrentHistoryAbsenToday)
router.post("/absen-masuk", verifyJwt, absenMasuk)
router.post("/absen-pulang", verifyJwt, absenPulang)

router.get("/absensi-personil/:id", verifyJwt, getCurrentHistoryAbsenPerUser)
router.get("/absensi-personil-today", verifyJwt, getAllAbsensiPersonilToday)
router.post("/tindak-disiplin/:id", verifyJwt, tindakDisiplin)
router.post("/rekap-absensi", verifyJwt, rekapAbsensi)

export default router