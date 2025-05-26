import express from 'express';
import { analyzeLeetCode } from '../controllers/leetcodeController.js';

const router = express.Router();

router.get('/:username', analyzeLeetCode);

export default router;
