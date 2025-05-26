// backend/utils/leetcodeUtils.js
import axios from 'axios';
import { fetchLeetCodeContestData } from '../services/leetcodeContestService.js';

export const getLeetCodeScore = async (username) => {
    try {
        const { data } = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);

        if (!data || !data.totalSolved) {
            return { score: 0, details: { error: 'Invalid or missing data from LeetCode' } };
        }

        const {
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            ranking,
            recentSubmission,
        } = data;

        const contestStats = await fetchLeetCodeContestData(username);

        let score = 0;

        // Total Solved
        if (totalSolved >= 400) score += 7;
        else if (totalSolved >= 300) score += 5;
        else if (totalSolved >= 150) score += 3;
        else if (totalSolved >= 75) score += 1;

        // Easy
        if (easySolved >= 100) score += 1;

        // Medium
        if (mediumSolved >= 150) score += 3;
        else if (mediumSolved >= 100) score += 2;

        // Hard
        if (hardSolved >= 75) score += 3;
        else if (hardSolved >= 50) score += 2;

        // Contest Rating
        const contestRating = contestStats?.rating || 0;

        if (contestRating >= 2000) score += 6;
        else if (contestRating >= 1800) score += 4;
        else if (contestRating >= 1600) score += 2;
        else if (contestRating >= 1400) score += 1;

        // Global Ranking % (Top X%)
        const globalRank = contestStats?.globalRanking;
        const totalParticipants = contestStats?.totalParticipants;

        if (globalRank && totalParticipants) {
            const topPercent = (globalRank / totalParticipants) * 100;

            if (topPercent <= 5) score += 3;
            else if (topPercent <= 10) score += 2;
            else if (topPercent <= 25) score += 1;
        }

        // Recent Activity
        // if (recentSubmission === true) score += 2;
        const recentSubmissions = data.recentSubmissions;
        const now = Date.now(); // current time in milliseconds
        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

        let hasRecentActivity = recentSubmissions.some(sub => {
            const subTimeMs = parseInt(sub.timestamp) * 1000; // convert to ms
            return now - subTimeMs <= THIRTY_DAYS_MS;
        });

        if (hasRecentActivity) score += 2;


        return {
            score,
            details: {
                totalSolved,
                easySolved,
                mediumSolved,
                hardSolved,
                contestRating,
                globalRanking: globalRank,
                totalParticipants,
                hasRecentActivity,
            },
            contestStats,
        };

    } catch (error) {
        console.error('Error fetching LeetCode stats:', error.message);
        return { score: 0, details: { error: error.message } };
    }
};
