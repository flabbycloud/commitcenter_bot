const { Octokit } = require('@octokit/rest');
const config = require('../config');
const storage = require('../utils/storage');
const telegramService = require('./telegramService');

const octokit = new Octokit({ auth: config.GITHUB_TOKEN });

async function addRepository(repo) {
  const [owner, repoName] = repo.split('/');
  try {
    await octokit.repos.get({ owner, repo: repoName });
    const repos = storage.loadRepositories();
    if (!repos.includes(repo)) {
      repos.push(repo);
      storage.saveRepositories(repos);
    }
  } catch (error) {
    throw new Error(`Failed to add a repository ${repo}: ${error.message}`);
  }
}

async function checkNewCommits(bot) {
  const repos = storage.loadRepositories();

  for (const repo of repos) {
    const [owner, repoName] = repo.split('/');
    try {
      const { data: commits } = await octokit.repos.listCommits({
        owner,
        repo: repoName,
        per_page: 5,
      });

      const lastKnownCommit = storage.loadLastCommit(repo);
      const newCommits = commits.filter(commit => 
        !lastKnownCommit || new Date(commit.commit.author.date) > new Date(lastKnownCommit.date)
      );
   
      if (newCommits.length > 0) {
        for (const commit of newCommits.reverse()) {
          const commitMessageLines = commit.commit.message.split('\n');
          const mainMessage = commitMessageLines[0] || 'No message';
          const additionalLines = commitMessageLines.slice(1).join('\n') || '';
          const message = `
          🌱 <b>${repoName}</b> 
          <blockquote>${mainMessage}${additionalLines ? `\n\n${additionalLines}` : ''}</blockquote>`;

          await telegramService.sendMessage(bot, config.CHANNEL_ID, message.trim(), { parse_mode: 'HTML' });
        }
        storage.saveLastCommit(repo, commits[0]);
      }
    } catch (error) {
      console.error(`Error checking ${repo}:`, error.message);
    }
  }
}


module.exports = {
  addRepository,
  checkNewCommits,
};