import { fetchMediumPosts } from '../utils/mediumUtils.js';

const TECH_KEYWORDS = [
    'API', 'JavaScript', 'React', 'Node', 'Tutorial', 'Guide',
    'Machine Learning', 'Deep Learning', 'Docker', 'Kubernetes',
    'Linux', 'TypeScript', 'SQL', 'MongoDB', 'DevOps', 'AWS'
];

const matchesTechKeywords = (text = '') => {
    return TECH_KEYWORDS.some(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
    );
};

export const calculateMediumScore = async (mediumUrl) => {
    const posts = await fetchMediumPosts(mediumUrl);
    let score = 0;

    if (posts.length >= 3) score += 6;

    const recentPost = posts.find(post => {
        const pubDate = new Date(post.pubDate);
        const daysAgo = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysAgo <= 30;
    });
    if (recentPost) score += 4;

    const techContent = posts.some(post =>
        matchesTechKeywords(post.title) || matchesTechKeywords(post.content || post.contentSnippet)
    );
    if (techContent) score += 5;

    return {
        score,
        details: {
            totalPosts: posts.length,
            recentActivity: !!recentPost,
            techContent,
        },
    };
};
