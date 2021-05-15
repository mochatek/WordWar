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

    const status = response.status;
    const data = await response.json();

    return { status, msg: data.msg };
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

    const status = response.status;
    const data = await response.json();

    return { status, msg: data.msg };
  }
}

export default new ApiService();
