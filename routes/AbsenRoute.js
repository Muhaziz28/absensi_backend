import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { absenMasuk, getCurrentHistoryAbsen } from "../controllers/AbsenController.js";

const router = express.Router();

router.get("/history-absensi", verifyJwt, getCurrentHistoryAbsen)

router.post("/absen-masuk", verifyJwt, absenMasuk)

export default router