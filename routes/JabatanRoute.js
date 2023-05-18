import express from "express"
import { createJabatan, deleteJabatan, getAllJabatan, updateJabatan } from "../controllers/JabatanController.js"
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from "../middleware/superadmin.js";

const router = express.Router()

router.get("/jabatan", verifyJwt, getAllJabatan)
router.post("/jabatan", verifyJwt, superadmin, createJabatan)
router.put("/jabatan/:id", verifyJwt, superadmin, updateJabatan)
router.delete("/jabatan/:id", verifyJwt, superadmin, deleteJabatan)

export default router
