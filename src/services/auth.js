class AuthService {
  constructor() {
    this.ENDPOINT = "http://localhost:5000/api/auth";
  }

  async signup(user, pass) {
    const response = await fetch(`${this.ENDPOINT}/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });

    const status = response.status;
    const data = await response.json();

    return { status, msg: data.msg };
  }

  async signin(user, pass) {
    const response = await fetch(`${this.ENDPOINT}/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });

    const status = response.status;
    const data = await response.json();

    if (data.token) localStorage.setItem("access_token", data.token);

    return { status, msg: data.msg };
  }

  signout() {
    return localStorage.removeItem("access_token");
  }

  getUser() {
    const token = localStorage.getItem("access_token");
    const payload = token && token.strip["."][1];
    const user = payload && JSON.parse(atob(payload)).name;
    return user;
  }
}

export default new AuthService();
