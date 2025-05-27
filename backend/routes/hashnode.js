import express from 'express';
import { calculateHashnodeScore } from '../controllers/hashnodeController.js';

const router = express.Router();

// POST /api/hashnode/score
router.post('/score', calculateHashnodeScore);

// GET /api/hashnode/score (for testing with query params)
router.get('/score', calculateHashnodeScore);

export default router;