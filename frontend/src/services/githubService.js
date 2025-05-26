// src/services/githubService.js
import axios from 'axios';

export const analyzeGitHub = async (githubUrl) => {
  const res = await axios.post('http://localhost:5000/api/github/analyze', {
    githubUrl,
  });
  return res.data;
};
