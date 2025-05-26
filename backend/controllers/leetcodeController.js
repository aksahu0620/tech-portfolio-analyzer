import { getLeetCodeScore } from '../utils/leetcodeUtils.js';
import { fetchLeetCodeContestData } from '../services/leetcodeContestService.js';

export const analyzeLeetCode = async (req, res) => {
    const { username } = req.params;

    try {
        const scoreData = await getLeetCodeScore(username);
        const contestStats = await fetchLeetCodeContestData(username);

        res.json({
            ...scoreData,
            contestStats, // ← not used in score logic yet
        });
    } catch (error) {
        console.error('Error analyzing LeetCode:', error.message);
        res.status(500).json({ error: 'Failed to analyze LeetCode data' });
    }
};
