// routes.js

import express from 'express'
const router = express.Router()

import jwtMiddleware from '@/middleware/jwtmiddleware.js'

import EssController from '@/controller/EssController.js'
import JWTControoler from '@/controller/JWTController.js'

router.post('/jwt', JWTControoler.postJWT)

// 增加middleware 判斷token
router.use(jwtMiddleware)
router.post('/ess_cal/ess_status', EssController.postEssStatus)

export default router
