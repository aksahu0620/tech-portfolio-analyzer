// src/components/GitHubInput.jsx
import { useState } from 'react';
import { analyzeGitHub } from '../services/githubService';

const GitHubInput = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const data = await analyzeGitHub(url);
    setResult(data);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter GitHub Profile URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button onClick={handleAnalyze} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Analyze GitHub
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="font-bold">Top Repos:</h3>
          <ul>
            {result.repos.map((repo, idx) => (
              <li key={idx}>{repo.name} - ⭐ {repo.stars} / 🍴 {repo.forks}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubInput;
