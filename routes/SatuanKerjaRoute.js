import express from "express"
import {
    createSatuanKerja,
    deleteSatuanKerja,
    getAllSatuanKerja,
    updateSatuanKerja
} from "../controllers/SatuanKerjaController.js"
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from "../middleware/superadmin.js";

const router = express.Router()

router.get("/satuan_kerja", getAllSatuanKerja)
router.post("/satuan_kerja", verifyJwt, superadmin, createSatuanKerja)
router.put("/satuan_kerja/:id", verifyJwt, superadmin, updateSatuanKerja)
router.delete("/satuan_kerja/:id", verifyJwt, superadmin, deleteSatuanKerja)

export default router
