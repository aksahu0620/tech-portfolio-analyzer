import express from 'express';
import { getMediumScore } from '../controllers/mediumController.js';

const router = express.Router();
router.post('/', getMediumScore);
export default router;
