import express from 'express'
import {verifyJwt} from "../middleware/verifyJwt.js";
import {createPangkat, deletePangkat, getAllPangkat, updatePangkat} from "../controllers/PangkatController.js";

const router = express.Router()

router.get("/pangkat", verifyJwt, getAllPangkat)
router.post("/pangkat", verifyJwt,createPangkat)
router.put("/pangkat/:id", verifyJwt, updatePangkat)
router.delete("/pangkat/:id", verifyJwt, deletePangkat)

export default router