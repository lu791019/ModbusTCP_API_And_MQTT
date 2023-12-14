// routes.js


import express from 'express';
const router = express.Router();
import EssController from '@/controller/EssController.js';

router.post('/ess_cal/ess_status', EssController.postEssStatus);


export default router;