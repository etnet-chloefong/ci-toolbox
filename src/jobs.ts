import * as core from '@actions/core';
import * as github from '@actions/github';

export function commentPR() {
  console.log('Run Job: Comment PR');
  const context = github.context;
  const token = core.getInput('token');
  const message = core.getInput('message');
  const octokit = github.getOctokit(token);

  if (!token) {
    throw Error('[commentPR] Missing token argument');
  }
  if (!message) {
    throw Error('[commentPR] Missing message argument');
  }
  if (!context.payload.pull_request) {
    throw Error('[commentPR] This is not a pull request deployment');
  }

  const pull = context.payload.pull_request;
  if (pull.state !== 'open') {
    throw Error('[commentPR] Pull request has been closed');
  }

  console.log(`[commentPR] Create comment ${message}`);
  octokit.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pull.number,
    body: message
  });
}

export function setStatus() {
  console.log('Run Job: Set Status');
}

export function sayHello() {
  console.log('Run Job: Say Hello');
  console.log('Say hello from inside a container!');
}
