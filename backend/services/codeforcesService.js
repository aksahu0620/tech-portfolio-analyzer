import axios from 'axios';

export const fetchCodeforcesData = async (handle) => {
  try {
    // Fetch user info
    const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    const userInfo = userInfoResponse.data.result[0];

    // Fetch user rating history
    const userRatingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const ratingHistory = userRatingResponse.data.result;

    // Fetch user submissions
    const userStatusResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    const submissions = userStatusResponse.data.result;

    return { userInfo, ratingHistory, submissions };
  } catch (error) {
    console.error('Error fetching Codeforces data:', error.message);
    throw error;
  }
};
