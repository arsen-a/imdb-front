import { authService } from "../../services/AuthService";

export const AuthStoreModule = {
  state: {
    token: localStorage.getItem("token"),
    registerErrors: [],
    loginErrors: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterErrors(state, errors) {
      state.registerErrors = errors;
    },
    setLoginErrors(state, errors) {
      state.loginErrors = errors;
    }
  },
  actions: {
    async registerUser(context, credentials) {
      try {
        const response = await authService.register(credentials);
        context.commit("setRegisterErrors", null);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        return response;
      } catch (exception) {
        context.commit("setRegisterErrors", exception.response.data.errors);
      }
    },
    async login(context, credentials) {
      try {
        const response = await authService.login(credentials);
        authService.setHeaders({
          Authorization: `Bearer ${response.data.token}`
        });
        context.commit("setToken", response.data.token);
        context.commit("setLoginErrors", null);
        localStorage.setItem("token", response.data.token);
        return response;
      } catch (exception) {
        if (exception.response.data && exception.response.data.error) {
          context.commit("setLoginErrors", exception.response.data.error);
        }
      }
    },
    async logout(context) {
      context.commit("setToken", null);
      localStorage.removeItem("token");
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.token;
    },
    registerErrors(state) {
      return state.registerErrors;
    },
    loginErrors(state) {
      return state.loginErrors;
    }
  }
};
