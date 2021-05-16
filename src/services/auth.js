class AuthService {
  constructor() {
    this.ENDPOINT = "http://localhost:5000/api/auth";
    this.is_authenticated = false;
  }

  async signup(user, pass) {
    const response = await fetch(`${this.ENDPOINT}/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });

    const data = await response.json();

    return data;
  }

  async signin(user, pass) {
    const response = await fetch(`${this.ENDPOINT}/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("access_token", data.token);
      this.is_authenticated = true;
    }

    return data;
  }

  signout() {
    this.is_authenticated = false;
    return localStorage.removeItem("access_token");
  }

  getUser() {
    const token = localStorage.getItem("access_token");
    const payload = token && token.split(".")[1];
    const user = payload && JSON.parse(atob(payload)).name;

    return user;
  }
}

export default new AuthService();
