# GitHub Backup

Clone all repos for an authenticated user to a local directory.

## Prequisites

- Install Git
- Install Node.js
- Run `npm install` in this directory
- Create a [personal access token](https://github.com/settings/tokens/new) (PAT) with the `repo` scope.
    - The `repo` scope is needed to fetch private repositories.

## Usage

```bash
export GITHUB_TOKEN='<PAT>'
./gh-backup DESTINATION
```

### Example

```bash
export GITHUB_TOKEN='<PAT>'
./gh-backup "$HOME/Code/gh-backup"
```