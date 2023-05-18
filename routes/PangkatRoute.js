import express from 'express'
import { verifyJwt } from "../middleware/verifyJwt.js";
import { createPangkat, deletePangkat, getAllPangkat, updatePangkat } from "../controllers/PangkatController.js";
import { superadmin } from '../middleware/superadmin.js';

const router = express.Router()

router.get("/pangkat", verifyJwt, getAllPangkat)
router.post("/pangkat", verifyJwt, superadmin, createPangkat)
router.put("/pangkat/:id", verifyJwt, superadmin, updatePangkat)
router.delete("/pangkat/:id", verifyJwt, superadmin, deletePangkat)

export default router