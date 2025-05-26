import express from 'express';
import { getGitHubScore } from '../controllers/githubController.js';

const router = express.Router();

router.get('/score/:username', getGitHubScore);

export default router;
