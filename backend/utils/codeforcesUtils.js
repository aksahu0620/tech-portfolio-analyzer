
export const calculateCodeforcesScore = async ({ userInfo, ratingHistory, submissions }) => {
    let score = 0;

    // Max Rating
    const maxRating = Math.max(...ratingHistory.map(r => r.newRating));
    if (maxRating >= 2200) score += 10;
    else if (maxRating >= 2000) score += 8;
    else if (maxRating >= 1800) score += 5;
    else if (maxRating >= 1600) score += 3;

    // Number of Contests
    const contests = ratingHistory.length;
    if (contests >= 100) score += 5;
    else if (contests >= 50) score += 3;
    else if (contests >= 20) score += 1;

    // Problems Solved
    const solvedProblems = new Set();
    submissions.forEach(submission => {
        if (submission.verdict === 'OK') {
            const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
            solvedProblems.add(problemId);
        }
    });
    const problemsSolvedCount = solvedProblems.size;
    if (problemsSolvedCount >= 800) score += 5;
    else if (problemsSolvedCount >= 500) score += 3;
    else if (problemsSolvedCount >= 200) score += 1;

    // Recent Submissions (last 30 days)
    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60);
    const recentSubmissions = submissions.filter(submission => submission.creationTimeSeconds >= thirtyDaysAgo);
    if (recentSubmissions.length > 0) score += 5;

    return {
        score,
        details: {
            maxRating,
            contests,
            problemsSolved: problemsSolvedCount,
            recentSubmissions: recentSubmissions.length,
        },
    };
};
