import express from "express"
import { createKonfigurasiAbsensi, getKonfigurasiAbsensi, updateKonfigurasiAbsensi } from "../controllers/KonfigurasiAbsensiController.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from "../middleware/superadmin.js";
import { propam } from "../middleware/propam.js";

const router = express.Router()

router.get('/konfigurasi_absensi', verifyJwt, getKonfigurasiAbsensi)
router.post('/konfigurasi_absensi', verifyJwt, superadmin, createKonfigurasiAbsensi)
// propam
router.put('/konfigurasi_absensi/:id', verifyJwt, propam, updateKonfigurasiAbsensi)


export default router