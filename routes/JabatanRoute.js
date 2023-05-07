import express from "express"
import {createJabatan, getAllJabatan} from "../controllers/JabatanController.js"
import {verifyJwt} from "../middleware/verifyJwt.js";

const router = express.Router()

router.get("/jabatan", verifyJwt, getAllJabatan)
router.post("/jabatan", verifyJwt, createJabatan)

export default router
