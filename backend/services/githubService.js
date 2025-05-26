import axios from 'axios';

export const fetchGitHubData = async (username) => {
  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  const userRes = await axios.get(userUrl);
  const reposRes = await axios.get(reposUrl);

  return {
    user: userRes.data,
    repos: reposRes.data
  };
};
