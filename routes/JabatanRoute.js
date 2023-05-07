import express from "express"
import {createJabatan, getAllJabatan, updateJabatan} from "../controllers/JabatanController.js"
import {verifyJwt} from "../middleware/verifyJwt.js";

const router = express.Router()

router.get("/jabatan", verifyJwt, getAllJabatan)
router.post("/jabatan", verifyJwt, createJabatan)
router.put("/jabatan/:id", verifyJwt, updateJabatan)

export default router
