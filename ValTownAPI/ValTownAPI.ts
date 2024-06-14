export class ValTownAPI {
  constructor(private apiKey: string) {}

  async getUserID() {
    const response = await fetch('https://api.val.town/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching user details: ${response.statusText}`);
    }

    const userDetails = await response.json();
    return userDetails.id;
  }

  async getAllVals() {
    const userId = await this.getUserID();
    const response = await fetch(`https://api.val.town/v1/users/${userId}/vals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching vals: ${response.statusText}`);
    }

    return response.json();
  }
}
