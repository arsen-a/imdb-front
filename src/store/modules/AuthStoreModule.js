import { authService } from "../../services/AuthService";

export const AuthStoreModule = {
  state: {
    token: localStorage.getItem("token"),
    registerErrors: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterErrors(state, errors) {
      state.registerErrors = errors;
    }
  },
  actions: {
    async registerUser(context, credentials) {
      try {
        const response = await authService.register(credentials);
        authService.setHeaders({
          Authorization: `Bearer ${response.data.token}`
        });
        context.commit("setToken", response.data.token);
        context.commit("setRegisterErrors", null);
        localStorage.setItem("token", response.data.token);
        return response;
      } catch (exception) {
        context.commit("setRegisterErrors", exception.response.data.errors);
      }
    }
  },
  getters: {
    registerErrors(state) {
      return state.registerErrors;
    }
  }
};
