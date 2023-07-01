import express from "express"
import { createJabatan, deleteJabatan, getAllJabatan, updateJabatan } from "../controllers/JabatanController.js"
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from "../middleware/superadmin.js";
import { keuangan } from "../middleware/keuangan.js";

const router = express.Router()

router.get("/jabatan", verifyJwt, getAllJabatan)
router.post("/jabatan", verifyJwt, keuangan, createJabatan)
router.put("/jabatan/:id", verifyJwt, keuangan, updateJabatan)
router.delete("/jabatan/:id", verifyJwt, keuangan, deleteJabatan)

export default router
