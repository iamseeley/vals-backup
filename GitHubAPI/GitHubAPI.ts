export class GitHubAPI {
  constructor(private token: string) {}

  async getRepoContent(repo: string, path: string, branch: string) {
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

  async getFileSHA(repo: string, path: string, branch: string) {
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

  async updateFile(repo: string, path: string, content: string, sha: string, message: string, branch: string) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        content: btoa(unescape(encodeURIComponent(content))),
        sha: sha,
        branch: branch
      })
    });

    if (!response.ok) {
      const responseBody = await response.json();
      console.error(`Error updating file: ${response.statusText}`);
      console.error(`Response body: ${JSON.stringify(responseBody)}`);
      throw new Error(`Error updating file: ${response.statusText}`);
    }

    return response.json();
  }

  async createFile(repo: string, path: string, content: string, message: string, branch: string) {
    const url = `https://api.github.com/repos/${repo}/contents/${path}`;

    let body: any = {
      message: message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: branch
    };

    try {
      const response = await fetch(`${url}?ref=${branch}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        body.sha = data.sha;
      }
    } catch (error) {
      console.error(`Error fetching file SHA: ${error.message}`);
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const responseBody = await response.json();
      console.error(`Error creating file: ${response.statusText}`);
      console.error(`Response body: ${JSON.stringify(responseBody)}`);
      throw new Error(`Error creating file: ${response.statusText}`);
    }

    return response.json();
  }

  async getCommitHistory(repo: string, path: string, branch: string) {
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
