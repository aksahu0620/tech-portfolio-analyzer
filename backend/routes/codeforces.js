import express from 'express';
import { getCodeforcesScore } from '../controllers/codeforcesController.js';

const router = express.Router();

router.get('/:handle', getCodeforcesScore);

export default router;
