import { Octokit } from "octokit";

async function githubBackup(octokit) {
    const repos = await octokit.paginate("GET /user/repos", {
        type: "owner",
        sort: "full_name"
    });

    console.log(JSON.stringify(repos.map(x => x.full_name)));
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