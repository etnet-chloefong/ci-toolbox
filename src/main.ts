import * as core from '@actions/core';

import {commentPR, sayHello, setStatus} from './jobs';

async function run() {
  try {
    switch (core.getInput('job')) {
      case 'comment-pr':
        commentPR();
        break;
      case 'set-status':
        setStatus();
        break;
      case 'hello':
      default:
        sayHello();
        break;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
