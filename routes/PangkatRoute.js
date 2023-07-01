import express from 'express'
import { verifyJwt } from "../middleware/verifyJwt.js";
import { createPangkat, deletePangkat, getAllPangkat, updatePangkat } from "../controllers/PangkatController.js";
import { superadmin } from '../middleware/superadmin.js';
import { keuangan } from '../middleware/keuangan.js';

const router = express.Router()

router.get("/pangkat", verifyJwt, getAllPangkat)
router.post("/pangkat", verifyJwt, keuangan, createPangkat)
router.put("/pangkat/:id", verifyJwt, keuangan, updatePangkat)
router.delete("/pangkat/:id", verifyJwt, keuangan, deletePangkat)

export default router