import express from 'express'
import {createRole, deleteRole, getAllRole, updateRole} from '../controllers/RoleController.js'
import {verifyJwt} from "../middleware/verifyJwt.js";

const router = express.Router()

router.get("/role", verifyJwt, getAllRole)
router.post("/role", verifyJwt, createRole)
router.put("/role/:id", verifyJwt, updateRole)
router.delete("/role/:id", verifyJwt, deleteRole)



export default router