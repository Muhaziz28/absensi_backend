import express from "express"
import { createDataIstri, deleteDataIstri, getDataIstri, getDataIstriById, updateDataIstri } from "../controllers/IstriController.js"
import { verifyJwt } from "../middleware/verifyJwt.js"

const router = express.Router()

router.get('/istri', verifyJwt, getDataIstri)
router.post('/istri', verifyJwt, createDataIstri)
router.get('/istri/:id', verifyJwt, getDataIstriById)
router.put('/istri/:id', verifyJwt, updateDataIstri)
router.delete('/istri/:id', verifyJwt, deleteDataIstri)

export default router