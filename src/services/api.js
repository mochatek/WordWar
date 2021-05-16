class ApiService {
  constructor() {
    this.ENDPOINT = "http://localhost:5000/api";
  }

  async get(resource) {
    const response = await fetch(`${this.ENDPOINT}/${resource}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async post(resource, body) {
    const response = await fetch(`${this.ENDPOINT}/${resource}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  }
}

export default new ApiService();
