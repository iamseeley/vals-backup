import { ValTownAPI } from 'https://esm.town/v/iamseeley/ValTownAPI';
import { GitHubAPI } from 'https://esm.town/v/iamseeley/GitHubAPI';

const VAL_TOWN_API_KEY = Deno.env.get('valtown');
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
const GITHUB_REPO = "iamseeley/vals-backup";
const GITHUB_BRANCH = "main";


const valTownAPI = new ValTownAPI(VAL_TOWN_API_KEY);
const gitHubAPI = new GitHubAPI(GITHUB_TOKEN);

async function fetchVals() {
  const response = await valTownAPI.getAllVals();
  return response.data;
}


async function getExistingFiles() {
  console.log(`Fetching existing files from repo: ${GITHUB_REPO}, branch: ${GITHUB_BRANCH}`);
  try {
    const response = await gitHubAPI.getRepoContent(GITHUB_REPO, "", GITHUB_BRANCH);
    console.log("Existing files:", response);
    return response.map(file => file.path);
  } catch (error) {
    console.error(`Error fetching repo content: ${error.message}`);
    throw error;
  }
}

async function getLastBackupDates() {
  const files = await getExistingFiles();
  const lastModifiedDates = {};

  for (const file of files) {
    const commitHistory = await gitHubAPI.getCommitHistory(GITHUB_REPO, file, GITHUB_BRANCH);
    lastModifiedDates[file] = new Date(commitHistory[0].commit.committer.date).getTime();
  }

  return lastModifiedDates;
}

async function updateOrCreateFile(filePath, fileContent, commitMessage) {
  const existingFiles = await getExistingFiles();
  const fileExists = existingFiles.includes(filePath);

  if (fileExists) {
    const sha = await gitHubAPI.getFileSHA(GITHUB_REPO, filePath, GITHUB_BRANCH);
    await gitHubAPI.updateFile(GITHUB_REPO, filePath, fileContent, sha, commitMessage);
  } else {
    await gitHubAPI.createFile(GITHUB_REPO, filePath, fileContent, commitMessage);
  }
}

async function backupVals() {
  const vals = await fetchVals();
  const lastBackupDates = await getLastBackupDates();
  const allValsDetails = [];

  for (const val of vals) {
    const valDir = val.name;
    const valPath = `${valDir}/${val.name}.ts`;
    const readmePath = `${valDir}/README.md`;

    const valModifiedDate = new Date(val.updatedAt).getTime();

    if (!lastBackupDates[valPath] || valModifiedDate > lastBackupDates[valPath]) {
      const valCodeContent = val.code;
      const readmeContent = val.readme || '';
      const valDetails = {
        name: val.name,
        updatedAt: val.updatedAt,
        readme: val.readme,
      };

      allValsDetails.push(valDetails);

      await updateOrCreateFile(valPath, valCodeContent, `Update val: ${val.name}`);
      await updateOrCreateFile(readmePath, readmeContent, `Update README: ${val.name}`);
    }
  }

  const allValsContent = JSON.stringify(allValsDetails, null, 2);
  await updateOrCreateFile(`vals.json`, allValsContent, `Update vals.json`);
  console.log("Backup complete.");
}

export async function runBackupIfChanged() {
  const vals = await fetchVals();
  const lastBackupDates = await getLastBackupDates();

  let changesDetected = false;

  for (const val of vals) {
    const valPath = `${val.name}/${val.name}.ts`;
    const valModifiedDate = new Date(val.updatedAt).getTime();

    if (!lastBackupDates[valPath] || valModifiedDate > lastBackupDates[valPath]) {
      changesDetected = true;
      break;
    }
  }

  if (changesDetected) {
    await backupVals();
  } else {
    console.log("No changes detected, skipping backup.");
  }
}

