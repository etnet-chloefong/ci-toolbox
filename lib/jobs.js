"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = exports.setStatus = exports.commentPR = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function commentPR() {
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
exports.commentPR = commentPR;
function setStatus() {
    console.log('Run Job: Set Status');
}
exports.setStatus = setStatus;
function sayHello() {
    console.log('Run Job: Say Hello');
    console.log('Say hello from inside a container!');
}
exports.sayHello = sayHello;
