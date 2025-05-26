import { fetchGitHubData } from '../services/githubService.js';
import { calculateGitHubScore } from '../utils/scoreUtils.js';

export const getGitHubScore = async (req, res) => {
  const { username } = req.params;

  try {
    const { repos } = await fetchGitHubData(username);
    const score = calculateGitHubScore(repos);

    res.status(200).json({ username, score });
  } catch (err) {
    res.status(500).json({ error: 'GitHub fetch or score error', message: err.message });
  }
};
