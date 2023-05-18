import express from "express"
import { verifyJwt } from "../middleware/verifyJwt.js"
import { createDataAnak, deleteDataAnak, getDataAnak, getDataAnakById, updateDataAnak } from "../controllers/AnakController.js"

const router = express.Router()

router.get('/anak', verifyJwt, getDataAnak)
router.post('/anak', verifyJwt, createDataAnak)
router.get('/anak/:id', verifyJwt, getDataAnakById)
router.put('/anak/:id', verifyJwt, updateDataAnak)
router.delete('/anak/:id', verifyJwt, deleteDataAnak)

export default router