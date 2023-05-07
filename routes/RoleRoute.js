import express from 'express'
import { createRole, deleteRole, getAllRole } from '../controllers/RoleController.js'

const router = express.Router()

router.get("/role", getAllRole)
router.post("/role", createRole)
router.delete("/role/:id", deleteRole)


export default router