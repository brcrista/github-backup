#!/usr/bin/env node

import { Octokit } from "octokit";

async function githubBackup(octokit) {
    const repos = await octokit.rest.repos.listForAuthenticatedUser();
    console.log(JSON.stringify(repos));
}

async function main() {
    try {
        const pat = process.env["GITHUB_TOKEN"];
        if (!pat) {
            throw new Error("The `GITHUB_TOKEN` environment variable must be set to a valid PAT.");
        }
        
        const octokit = new Octokit({
            auth: pat
        });

        await githubBackup(octokit);
        return 0;
    } catch (e) {
        console.error(e.message);
        return 1;
    }
}

await main();