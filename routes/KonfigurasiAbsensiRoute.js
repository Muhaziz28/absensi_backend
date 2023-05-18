import express from "express"
import { createKonfigurasiAbsensi, getKonfigurasiAbsensi } from "../controllers/KonfigurasiAbsensiController.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from "../middleware/superadmin.js";

const router = express.Router()

router.get('/konfigurasi_absensi', verifyJwt, getKonfigurasiAbsensi)
router.post('/konfigurasi_absensi', verifyJwt, superadmin, createKonfigurasiAbsensi)

export default router