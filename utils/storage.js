const fs = require('fs');
const path = require('path');

const REPOS_FILE = path.join(__dirname, '../data/repositories.json');
const COMMITS_FILE = path.join(__dirname, '../data/lastCommits.json');

function ensureDataFiles() {
  if (!fs.existsSync(path.dirname(REPOS_FILE))) {
    fs.mkdirSync(path.dirname(REPOS_FILE), { recursive: true });
  }
  if (!fs.existsSync(REPOS_FILE)) {
    fs.writeFileSync(REPOS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(COMMITS_FILE)) {
    fs.writeFileSync(COMMITS_FILE, JSON.stringify({}));
  }
}

function loadRepositories() {
  ensureDataFiles();
  return JSON.parse(fs.readFileSync(REPOS_FILE));
}

function saveRepositories(repos) {
  ensureDataFiles();
  fs.writeFileSync(REPOS_FILE, JSON.stringify(repos, null, 2));
}

function loadLastCommit(repo) {
  ensureDataFiles();
  const commits = JSON.parse(fs.readFileSync(COMMITS_FILE));
  return commits[repo];
}

function saveLastCommit(repo, commit) {
  ensureDataFiles();
  const commits = JSON.parse(fs.readFileSync(COMMITS_FILE));
  commits[repo] = {
    sha: commit.sha,
    date: commit.commit.author.date,
  };
  fs.writeFileSync(COMMITS_FILE, JSON.stringify(commits, null, 2));
}

module.exports = {
  loadRepositories,
  saveRepositories,
  loadLastCommit,
  saveLastCommit,
};