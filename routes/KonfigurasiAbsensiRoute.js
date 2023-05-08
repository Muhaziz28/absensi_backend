import express from "express"
import {getKonfigurasiAbsensi} from "../controllers/KonfigurasiAbsensiController.js";

const router = express.Router()

router.get('/konfigurasi_absensi', getKonfigurasiAbsensi)

export default router