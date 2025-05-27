import { calculateMediumScore } from '../services/mediumService.js';

export const getMediumScore = async (req, res) => {
  const { mediumUrl } = req.body;

  if (!mediumUrl) {
    return res.status(400).json({ error: 'mediumUrl is required' });
  }

  try {
    const result = await calculateMediumScore(mediumUrl);
    res.json(result);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Medium score' });
  }
};
