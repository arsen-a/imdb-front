import { HttpService } from "./HttpService.js";

class AuthService extends HttpService {
  login(credentials) {
    return this.axios.post("/auth/login", credentials);
  }

  register(credentials) {
    return this.axios.post("/auth/register", credentials);
  }
}

export const authService = new AuthService();
