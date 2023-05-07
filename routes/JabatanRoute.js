import express from "express"
import {getAllJabatan} from "../controllers/JabatanController.js"
import {verifyJwt} from "../middleware/verifyJwt.js";

const router = express.Router()

router.get("/jabatan", verifyJwt, getAllJabatan)

export default router
