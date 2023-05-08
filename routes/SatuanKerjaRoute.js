import express from "express"
import {
    createSatuanKerja,
    deleteSatuanKerja,
    getAllSatuanKerja,
    updateSatuanKerja
} from "../controllers/SatuanKerjaController.js"
import {verifyJwt} from "../middleware/verifyJwt.js";

const router = express.Router()

router.get("/satuan_kerja", getAllSatuanKerja)
router.post("/satuan_kerja", verifyJwt, createSatuanKerja)
router.put("/satuan_kerja/:id", verifyJwt, updateSatuanKerja)
router.delete("/satuan_kerja/:id", verifyJwt, deleteSatuanKerja)

export default router
