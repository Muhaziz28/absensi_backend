import express from 'express'
import dotenv from 'dotenv'
import { verifyJwt } from '../middleware/verifyJwt.js'
import { myProfile, updateMyProfile } from '../controllers/ProfileController.js'

const router = express.Router()

router.get('/profile', verifyJwt, myProfile)
router.put('/profile', verifyJwt, updateMyProfile)

export default router