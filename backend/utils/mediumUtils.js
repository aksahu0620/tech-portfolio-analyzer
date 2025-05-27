import Parser from 'rss-parser';
const parser = new Parser();

export const fetchMediumPosts = async (mediumUrl) => {
  try {
    const username = new URL(mediumUrl).pathname.split('@')[1] || '';
    if (!username) throw new Error('Invalid Medium URL');

    const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
    return feed.items || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error.message);
    return [];
  }
};
