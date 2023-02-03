const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class ShopApiClient {
  constructor() {
    this.base_url = BASE_API_URL;
  }

  async request(options) {
    let response = this.internalRequest(options);
    return response;
  }

  async internalRequest(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") query = "?" + query;

    let response;
    try {
      let requestOptions = {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          //Authorization: "Token 0cc50b64aef7c3241c3e061c8c59202bc379e65e",
          ...options.headers,
        },
        credentials: options.url === "/tokens/" ? "omit" : "omit",
        body: options.body ? JSON.stringify(options.body) : null,
      };
      if (this.isAuthenticated()) {
        requestOptions.headers.Authorization =
          "Token " + localStorage.getItem("access_token");
      }
      response = await fetch(
        this.base_url + options.url + query,
        requestOptions
      );
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is not responding.",
            description: error.toString(),
          };
        },
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
  }

  async get(url, query, options) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url, body, options) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url, body, options) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url, options) {
    return this.request({ method: "DELETE", url, ...options });
  }

  async login(username, password) {
    /*const response = await this.post("/tokens/", null, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });*/
    const response = await this.post("/tokens/", {
      username: username,
      password: password,
    });
    if (!response.ok) return response.status === 401 ? "fail" : "error";
    localStorage.setItem("access_token", response.body.token);
    return "ok";
  }

  async logout() {
    const response = await this.delete("/tokens/");
    localStorage.removeItem("access_token");
  }

  isAuthenticated() {
    return localStorage.getItem("access_token") !== null;
  }
}
