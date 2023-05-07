import express from 'express'
import {createRole, deleteRole, getAllRole, updateRole} from '../controllers/RoleController.js'

const router = express.Router()

router.get("/role", getAllRole)
router.post("/role", createRole)
router.put("/role/:id", updateRole)
router.delete("/role/:id", deleteRole)



export default router