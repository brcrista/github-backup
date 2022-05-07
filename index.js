import * as child_process from "child_process";
import * as path from "path";
import { Octokit } from "octokit";

async function githubBackup(octokit, destination) {
    const repositories = await octokit.paginate("GET /user/repos", {
        type: "owner",
        sort: "full_name"
    });

    console.log(`Found ${repositories.length} repositories.`);
    
    for (const repository of repositories) {
        await cloneRepository(repository, destination);
    }

    console.log("Done.");
}

async function cloneRepository(repository, destination) {
    console.log(`Cloning ${repository.full_name} to ${destination} ...`);
    // Sanitize input
    const gitURL = new URL(repository.clone_url);
    const cloneDirectory = path.resolve(destination, repository.name);
    child_process.execSync(`git clone ${gitURL.toString()} ${cloneDirectory}`);
}

const USAGE = "gh-backup DESTINATION";

async function main(args) {
    try {
        // Get the destination directory.
        if (args.length !== 3) {
            throw new Error(USAGE);
        }

        const destination = args[2];

        // Get the user's personal access token.
        const pat = process.env["GITHUB_TOKEN"];
        if (!pat) {
            throw new Error("The `GITHUB_TOKEN` environment variable must be set to a valid PAT.");
        }
        
        const octokit = new Octokit({
            auth: pat
        });

        // Run the backup.
        await githubBackup(octokit, destination);
        return 0;
    } catch (e) {
        console.error(e.message);
        return 1;
    }
}

await main(process.argv);