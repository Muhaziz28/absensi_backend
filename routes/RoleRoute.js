import express from 'express'
import { createRole, deleteRole, getAllRole, updateRole } from '../controllers/RoleController.js'
import { verifyJwt } from "../middleware/verifyJwt.js";
import { superadmin } from '../middleware/superadmin.js';

const router = express.Router()

router.get("/role", getAllRole)
router.post("/role", verifyJwt, superadmin, createRole)
router.put("/role/:id", verifyJwt, superadmin, updateRole)
router.delete("/role/:id", deleteRole)

export default router