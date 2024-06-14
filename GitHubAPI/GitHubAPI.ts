export class GitHubAPI {
  constructor(private token: string) {}

  async getRepoContent(repo, path, branch) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching repo content: ${response.statusText}`);
    }

    return response.json();
  }

  async getFileSHA(repo, path, branch) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching file SHA: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sha;
  }

  async updateFile(repo, path, content, sha, message, branch) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        content: btoa(content),
        sha: sha,
        branch: branch
      })
    });

    if (!response.ok) {
      throw new Error(`Error updating file: ${response.statusText}`);
    }

    return response.json();
  }

  async createFile(repo, path, content, message, branch) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        content: btoa(content),
        branch: branch
      })
    });

    if (!response.ok) {
      throw new Error(`Error creating file: ${response.statusText}`);
    }

    return response.json();
  }

  async getCommitHistory(repo, path, branch) {
    const response = await fetch(`https://api.github.com/repos/${repo}/commits?path=${path}&sha=${branch}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching commit history: ${response.statusText}`);
    }

    return response.json();
  }
}
