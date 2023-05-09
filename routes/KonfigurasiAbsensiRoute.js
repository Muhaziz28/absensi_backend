import express from "express"
import {createKonfigurasiAbsensi, getKonfigurasiAbsensi} from "../controllers/KonfigurasiAbsensiController.js";

const router = express.Router()

router.get('/konfigurasi_absensi', getKonfigurasiAbsensi)
router.post('/konfigurasi_absensi', createKonfigurasiAbsensi)

export default router