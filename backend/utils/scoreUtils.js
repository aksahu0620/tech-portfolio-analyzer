import dayjs from 'dayjs';

export const calculateGitHubScore = (repos) => {
  const score = {
    total: 0,
    repoScore: 0,
    profileScore: 0,
    details: []
  };

  const topRepos = repos
    .filter(repo => !repo.fork)
    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
    .slice(0, 3);

  let hasRecentCommit = false;
  let usedGitHubActions = false;

  for (const repo of repos) {
    if (dayjs(repo.pushed_at).isAfter(dayjs().subtract(30, 'day'))) {
      hasRecentCommit = true;
    }
    if (repo.name === '.github' || repo.name.includes('workflow')) {
      usedGitHubActions = true;
    }
  }

  topRepos.forEach(repo => {
    let repoPoints = 0;

    if (repo.stargazers_count >= 10) repoPoints += 2;
    if (repo.forks_count >= 3) repoPoints += 2;
    if (repo.has_issues !== undefined) repoPoints += 1; // Proxy for activity
    if (repo.license) repoPoints += 1;
    if (repo.size > 100) repoPoints += 2; // Rough proxy for commit activity

    score.repoScore += repoPoints;
    score.details.push({ repo: repo.name, repoPoints });
  });

  // Profile-level
  if (hasRecentCommit) score.profileScore += 3;
  if (usedGitHubActions) score.profileScore += 3;

  score.total = score.repoScore + score.profileScore;

  return score;
};
