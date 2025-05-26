import { fetchCodeforcesData } from '../services/codeforcesService.js';
import { calculateCodeforcesScore } from '../utils/codeforcesUtils.js';

export const getCodeforcesScore = async (req, res) => {
  const { handle } = req.params;

  try {
    const data = await fetchCodeforcesData(handle);
    const result = await calculateCodeforcesScore(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Codeforces data' });
  }
};
